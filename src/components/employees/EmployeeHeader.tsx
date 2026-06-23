"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Employee, EmployeeStatus } from "@/types/employee.types";
import { EMPLOYEE_STATUS_OPTIONS } from "@/constants/employee.constants";

import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import EmployeeTable from "./EmployeeTable";
import AddNewEmployeeModal from "./AddNewEmployeeModal";

import { subscribeToEmployees } from "@/lib/firebase/employees/employee.services";
import { useDebounce } from "@/hooks/useDebounce";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeHeader = () => {
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
  const [designationQuery, setDesignationQuery] = useState("");

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

  const debouncedDesignationQuery = useDebounce(designationQuery, 500);

  // ==================================================
  // Filter Employees
  // Search by:
  // 1. Employee Name
  // 2. Employee Status
  // 3. Employee Designation
  // ==================================================
  const filteredEmployees = useMemo(() => {
    return employee.filter((emp) => {
      const matchesSearch = emp.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;

      const matchesDesignation = emp.designation
        .toLowerCase()
        .includes(debouncedDesignationQuery.toLowerCase());

      return matchesSearch && matchesStatus && matchesDesignation;
    });
  }, [employee, debouncedSearchQuery, debouncedDesignationQuery, statusFilter]);

  return (
    <>
      {/* ==================================================
          Page Header
      ================================================== */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Employees</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {filteredEmployees.length} employees in your workspace
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
        >
          <Plus size={16} />
          New Employee
        </button>
      </div>

      {/* ==================================================
          Employee Filters
      ================================================== */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputField
          label="Search"
          value={searchQuery}
          placeholder="Search by employee name..."
          onChange={setSearchQuery}
        />

        <SelectField
          label="Status"
          value={statusFilter}
          options={EMPLOYEE_STATUS_OPTIONS}
          onChange={(value) => setStatusFilter(value as "All" | EmployeeStatus)}
        />

        <InputField
          label="Designation"
          value={designationQuery}
          placeholder="Search designation..."
          onChange={setDesignationQuery}
        />
      </div>

      {/* ==================================================
          Employee Table
      ================================================== */}
      <EmployeeTable
        employee={filteredEmployees}
        onEdit={handleUpdateEmployee}
      />

      {/* ==================================================
          Add Employee Modal
      ================================================== */}
      <AddNewEmployeeModal open={open} onClose={() => setOpen(false)} />

      {/* ==================================================
          Edit Employee Modal
          (To be implemented)
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
