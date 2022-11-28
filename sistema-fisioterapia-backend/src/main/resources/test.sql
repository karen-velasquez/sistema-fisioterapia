

SELECT c.* FROM usuarios c,roles a, usuario_rol b WHERE a.rol_nombre = 'PACIENTE' and b.rol_rol_id = a.rol_id and b.usuario_usuario_id = c.usuario_id;


SELECT c.* FROM ejercicios c WHERE c.parte_cuerpo ='inferior';

SELECT c.* FROM nota_sesion c, sesion d WHERE c.sesion_id_id = d.id and d.paciente_id_usuario_id='2' and d.lesion_id_lesion_id='1';