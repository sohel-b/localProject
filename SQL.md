# SQL Practice Questions and Answers (Based on Provided Schema)

**Schema Overview**

- **offices**
  - `office_id` INT PK
  - `office_location` VARCHAR(100) NOT NULL
  - `manager_id` INT
- **departments**
  - `department_id` INT PK
  - `department_name` VARCHAR(100) NOT NULL
  - `office_id` INT (FK → offices)
- **employees**
  - `employee_id` INT PK
  - `first_name` VARCHAR(50)
  - `last_name` VARCHAR(50)
  - `email` VARCHAR(100)
  - `hire_date` DATE
  - `department_id` INT (FK → departments)
- **salaries**
  - `salary_id` INT PK
  - `employee_id` INT (FK → employees)
  - `base_salary` DECIMAL(10,2)
  - `bonus` DECIMAL(10,2)

---

## 1. List all employees’ first and last names.
**Answer:**
```sql
SELECT first_name, last_name
FROM employees;
```

## 2. Retrieve the locations of all offices.
**Answer:**
```sql
SELECT office_location
FROM offices;
```

## 3. Show each department’s name together with the location of its office.
**Answer:**
```sql
SELECT d.department_name, o.office_location
FROM departments d
JOIN offices o ON d.office_id = o.office_id;
```

## 4. List each employee’s full name together with the department they belong to.
**Answer:**
```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;
```

## 5. Show each employee’s name, their office location, and the department name.
**Answer:**
```sql
SELECT e.first_name,
       e.last_name,
       o.office_location,
       d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN offices o ON d.office_id = o.office_id;
```

## 6. Retrieve each employee’s name and their total compensation (base salary + bonus).
**Answer:**
```sql
SELECT e.first_name,
       e.last_name,
       (s.base_salary + s.bonus) AS total_compensation
FROM employees e
JOIN salaries s ON e.employee_id = s.employee_id;
```

## 7. Find the average total compensation per department.
**Answer:**
```sql
SELECT d.department_name,
       AVG(s.base_salary + s.bonus) AS avg_total_compensation
FROM departments d
JOIN employees e ON d.department_id = e.department_id
JOIN salaries s ON e.employee_id = s.employee_id
GROUP BY d.department_name;
```

## 8. Count how many employees work in each office.
**Answer:**
```sql
SELECT o.office_location,
       COUNT(e.employee_id) AS employee_count
FROM offices o
LEFT JOIN departments d ON o.office_id = d.office_id
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY o.office_location;
```

## 9. List departments that have more than 5 employees.
**Answer:**
```sql
SELECT d.department_name,
       COUNT(e.employee_id) AS employee_count
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
HAVING COUNT(e.employee_id) > 5;
```

## 10. Find employees whose total compensation is above the overall average compensation.
**Answer:**
```sql
SELECT e.first_name,
       e.last_name,
       (s.base_salary + s.bonus) AS total_compensation
FROM employees e
JOIN salaries s ON e.employee_id = s.employee_id
WHERE (s.base_salary + s.bonus) > (
    SELECT AVG(base_salary + bonus) FROM salaries
);
```

## 11. List offices that have no departments assigned to them.
**Answer:**
```sql
SELECT o.office_location
FROM offices o
LEFT JOIN departments d ON o.office_id = d.office_id
WHERE d.department_id IS NULL;
```

## 12. Retrieve the department(s) with the highest total salary expense (base + bonus summed).
**Answer:**
```sql
WITH dept_expense AS (
    SELECT d.department_id,
           d.department_name,
           SUM(s.base_salary + s.bonus) AS total_expense
    FROM departments d
    JOIN employees e ON d.department_id = e.department_id
    JOIN salaries s ON e.employee_id = s.employee_id
    GROUP BY d.department_id, d.department_name
)
SELECT department_name, total_expense
FROM dept_expense
WHERE total_expense = (SELECT MAX(total_expense) FROM dept_expense);
```

## 13. For each employee, display their total compensation and the average total compensation of their department (window function).
**Answer:**
```sql
SELECT e.first_name,
       e.last_name,
       (s.base_salary + s.bonus) AS total_compensation,
       AVG(s.base_salary + s.bonus) OVER (PARTITION BY e.department_id) AS dept_avg_compensation
FROM employees e
JOIN salaries s ON e.employee_id = s.employee_id;
```

## 14. Show each employee’s compensation rank within their department (higher compensation = rank 1).
**Answer:**
```sql
SELECT e.first_name,
       e.last_name,
       (s.base_salary + s.bonus) AS total_compensation,
       RANK() OVER (PARTITION BY e.department_id ORDER BY (s.base_salary + s.bonus) DESC) AS compensation_rank
FROM employees e
JOIN salaries s ON e.employee_id = s.employee_id;
```

## 15. Give a 10 % raise to the base salary of all employees in the “Sales” department.
**Answer:**
```sql
UPDATE salaries s
SET base_salary = base_salary * 1.10
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id = s.employee_id
  AND d.department_name = 'Sales';
```

## 16. Insert a new office record for “Downtown Campus”.
**Answer:**
```sql
INSERT INTO offices (office_location, manager_id)
VALUES ('Downtown Campus', NULL);   -- manager_id can be set later
```

## 17. Delete all salary records where the bonus is zero.
**Answer:**
```sql
DELETE FROM salaries
WHERE bonus = 0;
```

## 18. Find the top‑3 highest‑paid employees (by total compensation) in each department.
**Answer:**
```sql
SELECT department_id,
       employee_id,
       total_compensation
FROM (
    SELECT e.department_id,
           e.employee_id,
           (s.base_salary + s.bonus) AS total_compensation,
           ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY (s.base_salary + s.bonus) DESC) AS rn
    FROM employees e
    JOIN salaries s ON e.employee_id = s.employee_id
) sub
WHERE rn <= 3;
```

## 19. List employees who work in an office that is different from their department’s office.
**Answer:**
```sql
SELECT e.first_name,
       e.last_name,
       o.office_location AS employee_office,
       d_office.office_location AS department_office
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN offices o ON d.office_id = o.office_id          -- employee’s office (via department)
JOIN offices d_office ON d.office_id = d_office.office_id
WHERE o.office_id <> d_office.office_id;
```

## 20. Show the cumulative salary expense per office ordered by office location.
**Answer:**
```sql
SELECT o.office_location,
       SUM(s.base_salary + s.bonus) AS cumulative_expense
FROM offices o
JOIN departments d ON o.office_id = d.office_id
JOIN employees e ON d.department_id = e.department_id
JOIN salaries s ON e.employee_id = s.employee_id
GROUP BY o.office_location
ORDER BY o.office_location;
```

Feel free to execute these queries against a database that follows the schema above to practice a variety of SQL concepts, including joins, aggregates, sub‑queries, window functions, and data‑modification statements.
