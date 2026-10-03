INSERT INTO projects (id, name)
VALUES
    (1, 'Website Project'),
    (2, 'Mobile App Project')
ON CONFLICT (id) DO NOTHING;


INSERT INTO tasks (
    id,
    project_id,
    title,
    status
)
VALUES
    (1, 1, 'Create homepage', 'completed'),
    (2, 1, 'Create login page', 'in_progress'),
    (3, 1, 'Test API', 'pending'),
    (4, 2, 'Design mobile UI', 'completed'),
    (5, 2, 'Test mobile app', 'pending'),
    (6, 2, 'Fix navigation bug', 'in_progress')
ON CONFLICT (id) DO NOTHING;