"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Employee,
  EmployeeStatus,
  TechnicalPositionFilter,
  TechnicalPositionType,
} from "@/types/employee.types";
import {
  EMPLOYEE_STATUS_FILTER_OPTIONS,
  TECHNICALPOSITION_FILTER_OPTIONS,
} from "@/constants/employee.constants";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import EmployeeTable from "./EmployeeTable";
import AddNewEmployeeModal from "./AddNewEmployeeModal";

import { subscribeToEmployees } from "@/lib/firebase/employees/employee.services";
import { useDebounce } from "@/hooks/useDebounce";
import EditEmployeeModal from "./EditEmployeeModal";
import { useAuthStore } from "@/lib/store/auth.store";

const EmployeeHeader = () => {
  // ---- Zustand ----
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const isAdmin = role === "admin";
  // ==================================================
  // Employee Data State
  // Stores all employees received from Firestore
  // ==================================================
  const [employee, setEmployee] = useState<Employee[]>([]);

  // ==================================================
  // Filter States
  // Used for searching and filtering employees
  // ==================================================
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<"All" | EmployeeStatus>(
    "All",
  );

  // ==================================================
  // Modal States
  // Controls Add Employee modal visibility
  // ==================================================
  const [open, setOpen] = useState(false);

  // ==================================================
  // Update Employee States
  // Stores selected employee and controls update modal
  // ==================================================
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  // ==================================================
  // Handle Edit Employee
  // Opens edit modal and stores selected employee
  // ==================================================
  const handleUpdateEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  // ==================================================
  // Real-time Firestore Listener
  // Automatically updates UI when Firestore changes
  // ==================================================
  useEffect(() => {
    const unsubscribe = subscribeToEmployees((employees) => {
      setEmployee(employees);
    });

    return () => unsubscribe();
  }, []);

  // ==================================================
  // Debounced Search Values
  // Prevents filtering on every keystroke
  // ==================================================
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [technicalPositionFilter, setTechnicalPositionFilter] =
    useState<TechnicalPositionFilter>("All");

  // ==================================================
  // Filter Employees
  // Search by:
  // 1. Employee Name
  // 2. Employee Status
  // 3. Employee Designation
  // ==================================================
  const filteredEmployees = useMemo(() => {
    return employee
      .filter((emp) => {
        const matchesSearch = emp.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || emp.status === statusFilter;

        const matchesTechnicalPosition =
          technicalPositionFilter === "All" ||
          emp.technicalPosition === technicalPositionFilter;

        return matchesSearch && matchesStatus && matchesTechnicalPosition;
      })
      .sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1; // Because -1 means keep a before b.
        if (a.role !== "admin" && b.role === "admin") return 1; // Because -1 means keep b before a.
        return 0;
      });
  }, [employee, debouncedSearchQuery, statusFilter, technicalPositionFilter]);

  if (loading) {
    return null;
  }

  return (
    <>
      {/* ==================================================
          Page Header
          ================================================== */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Employees
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {filteredEmployees.length} employees in your workspace
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
          >
            <Plus size={16} />
            New Employee
          </button>
        )}
      </div>

      {/* ==================================================
          Employee Filters
          ================================================== */}
      <div className="mb-6 animate-fade-in rounded-xl p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputField
            label="Search"
            value={searchQuery}
            placeholder="Search by employee name..."
            onChange={setSearchQuery}
          />

          <SelectField
            label="Status"
            value={statusFilter}
            options={EMPLOYEE_STATUS_FILTER_OPTIONS}
            onChange={(value) =>
              setStatusFilter(value as "All" | EmployeeStatus)
            }
          />

          <SelectField
            label="Technical Position"
            value={technicalPositionFilter}
            options={TECHNICALPOSITION_FILTER_OPTIONS}
            onChange={(value) =>
              setTechnicalPositionFilter(value as "All" | TechnicalPositionType)
            }
          />
        </div>
      </div>

      {/* ==================================================
          Employee Table
          ================================================== */}
      <div className="animate-fade-in">
        <EmployeeTable
          employee={filteredEmployees}
          onEdit={handleUpdateEmployee}
        />
      </div>

      {/* ==================================================
          Add Employee Modal
          ================================================== */}
      <AddNewEmployeeModal open={open} onClose={() => setOpen(false)} />

      {/* ==================================================
          Edit Employee Modal
          ================================================== */}
      {isEditOpen && (
        <EditEmployeeModal
          open={isEditOpen}
          employee={selectedEmployee}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default EmployeeHeader;
