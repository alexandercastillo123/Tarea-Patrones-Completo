drop database if exists estudiantes_senatinos;
create database if not exists estudiantes_senatinos;
use estudiantes_senatinos;

-- tabla usuarios
create table login_usuario(
    id_usuario int primary key auto_increment,
    nombre_usuario varchar(100) not null,
    email varchar(50) not null unique,
    pass varchar(225) not null,
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema'
)engine=innodb;

-- tabla profesores
create table profesores(
    id_profesor int primary key auto_increment,
    nombre_profesor varchar(100) not null,
    especialidad varchar(50),
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema'
)engine=innodb;

-- tabla carreras
create table carreras_senati(
    id_carrera int primary key auto_increment,
    nombre_carrera varchar(50) not null,
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema'
)engine=innodb;

-- tabla bloques
create table bloques_senatinos(
    id_bloque int primary key auto_increment,
    nombre_bloque varchar(30) not null,
    id_profesor int,
    id_carrera int not null,
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema',
    foreign key (id_profesor) references profesores(id_profesor) on delete cascade,
    foreign key (id_carrera) references carreras_senati(id_carrera) on delete cascade
)engine=innodb;

-- tabla cursos
create table cursos(
    id_curso int primary key auto_increment,
    nombre_curso varchar(50) not null,
    id_profesor int,
    id_carrera int not null,
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema',
    foreign key (id_profesor) references profesores(id_profesor) on delete cascade,
    foreign key (id_carrera) references carreras_senati(id_carrera) on delete cascade
)engine=innodb;

-- tabla estudiantes
create table estudiantes(
    id_estudiante int primary key auto_increment,
    nombre_estudiante varchar(50) not null,
    apellido_estudiante varchar(50) not null,
    dni_estudiante char(8) not null unique,
    id_carrera int not null,
    id_bloque int,
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema',
    foreign key (id_carrera) references carreras_senati(id_carrera) on delete cascade,
    foreign key (id_bloque) references bloques_senatinos(id_bloque) on delete set null
)engine=innodb;

-- tabla notas
create table notas(
    id_nota int primary key auto_increment,
    nota decimal(4,2) not null,
    id_estudiante int not null,
    id_curso int not null,
    fecha_creacion timestamp default current_timestamp,
    fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
    usuario_grabacion varchar(100) default 'Sistema',
    foreign key (id_estudiante) references estudiantes(id_estudiante) on delete cascade,
    foreign key (id_curso) references cursos(id_curso) on delete cascade
)engine=innodb;

-- tabla historial
create table historial_actividades(
    id_historial int primary key auto_increment,
    usuario varchar(100) not null,
    accion varchar(50) not null,
    tabla_afectada varchar(50) not null,
    detalle text,
    id_referencia int,
    fecha_hora timestamp default current_timestamp
)engine=innodb;

-- datos profesores
insert into profesores (nombre_profesor, especialidad) values
('Omar Espinoza Manrique', 'Full Stack'),
('Alan Turing Huaman', 'Arquitectura'),
('Linus Torvalds Quispe', 'Sistemas'),
('Ada Lovelace Mendoza', 'Software'),
('Grace Hopper Ramos', 'Base de Datos');

-- datos carreras
insert into carreras_senati (nombre_carrera) values 
('Ingenieria de Software con IA'),
('Ciberseguridad'),
('Desarrollo de Videojuegos'),
('Redes y Comunicaciones'),
('Diseño Grafico');

-- datos bloques
insert into bloques_senatinos (nombre_bloque, id_profesor, id_carrera) values 
('LAB-201', 1, 1), 
('LAB-202', 3, 1), 
('REDES-101', 2, 2);

-- datos cursos
insert into cursos (nombre_curso, id_profesor, id_carrera) values 
('Patrones de Diseño', 1, 1), 
('Estructura de Datos', 3, 1), 
('Base de Datos II', 5, 1),    
('Etica Hacker', 2, 2);

-- datos estudiantes
insert into estudiantes (nombre_estudiante, apellido_estudiante, dni_estudiante, id_carrera, id_bloque, fecha_creacion) values
('Alexander', 'Gomez', '70000001', 1, 1, date_sub(now(), interval 7 day)),
('Braulio', 'Perez', '70000002', 1, 1, date_sub(now(), interval 7 day)),
('Carlos', 'Sanches', '70000003', 2, 3, date_sub(now(), interval 6 day)),
('Dante', 'Alva', '70000004', 3, null, date_sub(now(), interval 6 day)),
('Elena', 'Torres', '70000005', 4, null, date_sub(now(), interval 6 day)),
('Fabio', 'Luna', '70000006', 5, null, date_sub(now(), interval 5 day)),
('Gina', 'Vera', '70000007', 1, 2, date_sub(now(), interval 5 day)),
('Hugo', 'Rios', '70000008', 2, 3, date_sub(now(), interval 5 day)),
('Ivan', 'Soto', '70000009', 1, 1, date_sub(now(), interval 4 day)),
('Jaime', 'Milla', '70000010', 3, null, date_sub(now(), interval 4 day)),
('Kevin', 'Lara', '70000011', 1, 2, date_sub(now(), interval 4 day)),
('Luis', 'Cano', '70000012', 4, null, date_sub(now(), interval 3 day)),
('Marta', 'Polo', '70000013', 1, 1, date_sub(now(), interval 3 day)),
('Nora', 'Tello', '70000014', 5, null, date_sub(now(), interval 3 day)),
('Oscar', 'Duran', '70000015', 2, 3, date_sub(now(), interval 2 day)),
('Pilar', 'Meza', '70000016', 1, 2, date_sub(now(), interval 2 day)),
('Rosa', 'Valle', '70000017', 3, null, date_sub(now(), interval 2 day)),
('Saul', 'Peña', '70000018', 1, 1, date_sub(now(), interval 1 day)),
('Tito', 'Bazan', '70000019', 4, null, date_sub(now(), interval 1 day)),
('Uriel', 'Campos', '70000020', 1, 2, date_sub(now(), interval 1 day)),
('Victor', 'Zarate', '70000021', 2, 3, now()),
('Yuly', 'Arias', '70000022', 3, null, now()),
('Zoe', 'Rojas', '70000023', 1, 1, now()),
('Alvaro', 'Luz', '70000024', 1, 2, date_sub(now(), interval 4 day)),
('Bruno', 'Paz', '70000025', 2, 3, date_sub(now(), interval 4 day)),
('Ciro', 'Sol', '70000026', 1, 1, date_sub(now(), interval 5 day)),
('Dora', 'Mar', '70000027', 3, null, date_sub(now(), interval 3 day)),
('Erik', 'Oca', '70000028', 1, 2, date_sub(now(), interval 2 day)),
('Flor', 'Rey', '70000029', 4, null, date_sub(now(), interval 6 day)),
('Gaby', 'Gil', '70000030', 1, 1, now()),
('Iker', 'San', '70000031', 2, 3, date_sub(now(), interval 7 day)),
('Juan', 'Oro', '70000032', 1, 2, date_sub(now(), interval 1 day)),
('Lola', 'Sur', '70000033', 5, null, date_sub(now(), interval 3 day)),
('Mimo', 'Leo', '70000034', 1, 1, date_sub(now(), interval 4 day)),
('Nico', 'Rio', '70000035', 3, null, date_sub(now(), interval 2 day)),
('Otto', 'Abe', '70000036', 1, 2, now()),
('Pepe', 'Uva', '70000037', 2, 3, date_sub(now(), interval 5 day)),
('Rene', 'Efe', '70000038', 1, 1, date_sub(now(), interval 6 day)),
('Susi', 'Oso', '70000039', 4, null, date_sub(now(), interval 7 day)),
('Teo', 'Eco', '70000040', 1, 2, date_sub(now(), interval 2 day)),
('Vera', 'Ira', '70000041', 2, 3, now()),
('Xavi', 'Ufo', '70000042', 1, 1, date_sub(now(), interval 3 day)),
('Yago', 'Ajo', '70000043', 3, null, date_sub(now(), interval 4 day)),
('Zizu', 'Eje', '70000044', 1, 2, now()),
('Alan', 'Uno', '70000045', 2, 3, date_sub(now(), interval 1 day)),
('Beto', 'Dos', '70000046', 1, 1, date_sub(now(), interval 6 day)),
('Cely', 'Tres', '70000047', 4, null, date_sub(now(), interval 5 day)),
('Dony', 'Cuatro', '70000048', 1, 2, date_sub(now(), interval 2 day)),
('Emy', 'Cinco', '70000049', 5, null, date_sub(now(), interval 3 day)),
('Fany', 'Seis', '70000050', 1, 1, now());

-- datos notas
insert into notas (nota, id_estudiante, id_curso) values 
(18.5, 1, 1), (15.0, 1, 2), (12.0, 2, 1), (19.0, 3, 4), (11.5, 4, 4), (20.0, 5, 4);