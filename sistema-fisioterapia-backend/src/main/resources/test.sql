

SELECT c.* FROM usuarios c,roles a, usuario_rol b WHERE a.rol_nombre = 'PACIENTE' and b.rol_rol_id = a.rol_id and b.usuario_usuario_id = c.usuario_id;


