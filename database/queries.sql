-- ============================================
-- Seed Data
-- ============================================

INSERT INTO projects (id, name)
VALUES
    (1, 'Website Project'),
    (2, 'Mobile App Project');


INSERT INTO tasks (id, project_id, title, status)
VALUES
    (1, 1, 'Create homepage', 'completed'),
    (2, 1, 'Create login page', 'in_progress'),
    (3, 1, 'Test API', 'pending'),
    (4, 2, 'Design mobile UI', 'completed'),
    (5, 2, 'Test mobile app', 'pending'),
    (6, 2, 'Fix navigation bug', 'in_progress');


-- ============================================
-- Query 1: Each task with its project name
-- ============================================

SELECT
    tasks.id,
    tasks.title,
    projects.name AS project_name,
    tasks.status
FROM tasks
JOIN projects
    ON tasks.project_id = projects.id;


-- ============================================
-- Query 2: Find pending tasks
-- ============================================

SELECT
    id,
    title,
    project_id,
    status
FROM tasks
WHERE status = 'pending';


-- ============================================
-- Query 3: Count tasks for each project
-- ============================================

SELECT
    projects.id,
    projects.name,
    COUNT(tasks.id) AS task_count
FROM projects
LEFT JOIN tasks
    ON projects.id = tasks.project_id
GROUP BY
    projects.id,
    projects.name
ORDER BY
    projects.id;