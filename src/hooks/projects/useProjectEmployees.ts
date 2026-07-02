"use client";

import { useEffect, useMemo, useState } from "react";
import { Employee } from "@/types/employee.types";
import { subscribeEmployees } from "@/lib/firebase/employees/employee.services";
import {
  createEmployeeNameMap,
  getEmployeeById,
  getEmployeeName,
} from "@/utils/employee.utils";

export const useProjectEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeEmployees(setEmployees);
    return () => unsubscribe();
  }, []);

  const employeeNameMap = useMemo(
    () => createEmployeeNameMap(employees),
    [employees],
  );

  const employeeMap = useMemo(() => {
    return new Map(employees.map((e) => [e.id, e]));
  }, [employees]);

  const getEmployeesByIds = (ids: string[]) =>
    ids.map((id) => employeeMap.get(id)).filter(Boolean) as Employee[];

  const getName = (id: string) => getEmployeeName(id, employeeNameMap);

  const getEmployee = (id: string) => employeeMap.get(id);

  return {
    employees,
    employeeNameMap,
    getEmployeesByIds,
    getName,
    getEmployee,
  };
};
