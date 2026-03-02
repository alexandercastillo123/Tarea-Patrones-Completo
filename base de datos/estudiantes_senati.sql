drop database if exists estudiantes_senatinos;
create database if not exists estudiantes_senatinos;
use estudiantes_senatinos;

create table profesores(
    id_profesor int primary key auto_increment,
    nombre_profesor varchar(100) not null,
    especialidad varchar(50)
)engine=innodb;

create table bloques_senatinos(
    id_bloque int primary key auto_increment,
    nombre_bloque varchar(30) not null,
    id_profesor int,
    foreign key (id_profesor) references profesores(id_profesor)
)engine=innodb;

create table carreras_senati(
    id_carrera int primary key auto_increment,
    nombre_carrera varchar(50) not null
)engine=innodb;

create table cursos(
    id_curso int primary key auto_increment,
    nombre_curso varchar(50) not null,
    id_profesor int,
    id_carrera int not null,
    foreign key (id_profesor) references profesores(id_profesor),
    foreign key (id_carrera) references carreras_senati(id_carrera)
)engine=innodb;

create table estudiantes(
    id_estudiante int primary key auto_increment,
    nombre_estudiante varchar(50) not null,
    apellido_estudiante varchar(50) not null,
    edad_estudiante int not null,
    dni_estudiante char(8) not null unique,
    id_bloque int not null,
    id_carrera int not null,
    foreign key (id_bloque) references bloques_senatinos(id_bloque),
    foreign key (id_carrera) references carreras_senati(id_carrera)
)engine=innodb;

create table notas(
    id_nota int primary key auto_increment,
    nota decimal(4,2) not null,
    id_estudiante int not null,
    id_curso int not null,
    foreign key (id_estudiante) references estudiantes(id_estudiante),
    foreign key (id_curso) references cursos(id_curso)
)engine=innodb;

------------------
-- Datos de prueba

INSERT profesores (nombre_profesor, especialidad) VALUES
('Ing. OMAR ALI ESPINOZA MANRIQUE DE LARA', 'FULL STACK')
('Ing. Alan Turing Huamán', 'Arquitectura de Software'),
('MSc. Linus Torvalds Quispe', 'Sistemas Operativos'),
('Ing. Ada Lovelace Mendoza', 'Desarrollo Fullstack'),
('Lic. Grace Hopper Ramos', 'Bases de Datos');

INSERT carreras_senati (nombre_carrera) VALUES 
('Ingeniería de Software con IA'),
('Desarrollo de Videojuegos'),
('Ciberseguridad');

INSERT bloques_senatinos (nombre_bloque, id_profesor) VALUES 
('LAB-SOFTWARE-201', 1), 
('LAB-SOFTWARE-202', 3), 
('LAB-REDES-101', 2);

INSERT cursos (nombre_curso, id_profesor, id_carrera) VALUES 
('Patrones de Diseño', 1, 1), 
('Estructura de Datos', 3, 1), 
('Base de Datos II', 4, 1),    
('Ética en Ciberseguridad', 2, 3);

INSERT estudiantes (nombre_estudiante, apellido_estudiante, edad_estudiante, dni_estudiante, id_bloque, id_carrera) VALUES 
('Alexander', 'Gomez', 20, '70605040', 1, 1),
('Braulio', 'Perez', 19, '71819101', 1, 1),
('Carlos', 'Sánchez', 21, '72920212', 2, 1);

INSERT notas (nota, id_estudiante, id_curso) VALUES 
(18.50, 1, 1), 
(15.00, 1, 2), 
(12.00, 2, 1);