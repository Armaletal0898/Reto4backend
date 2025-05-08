-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2025 a las 04:30:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `registro_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
  `estrellas` int(11) NOT NULL CHECK (`estrellas` between 3 and 5),
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `estrellas`, `fecha`) VALUES
(1, 5, '2025-05-05 20:15:46'),
(2, 5, '2025-05-05 20:15:47'),
(3, 5, '2025-05-05 20:15:47'),
(4, 5, '2025-05-05 20:15:48'),
(5, 5, '2025-05-05 20:15:48'),
(6, 5, '2025-05-05 20:15:48'),
(7, 5, '2025-05-05 20:18:42'),
(8, 5, '2025-05-05 20:18:44'),
(9, 5, '2025-05-05 20:18:45'),
(10, 5, '2025-05-05 20:18:45'),
(11, 5, '2025-05-05 20:18:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `password`, `creado`) VALUES
(1, 'Albert Encarnacion', 'albertpeguero42@gmail.com', '809-354-7612', '$2b$10$KjW3Dz3tQTDztg7ZAbmQCujlUxnd/eddBGrZ51pGkeFR0.RNQBy2y', '2025-05-05 19:45:23'),
(2, 'Jonh doo', 'pegueroalbert42@gmail.com', '809-354-76434512', '$2b$10$pVkIHm5lbgkL0xeBk0Otsu17fJ1SNVdBK//lJie.4tZ/W5/8hxDU2', '2025-05-05 19:49:33'),
(3, 'luca donci', 'albertpeguero41@gmail.com', '829-354-7612', '$2b$10$FS0bgLx2jXbius68miVN8uRuu7IHGuT52UfFR/liw25VnF.bd2NGC', '2025-05-05 20:24:43'),
(4, 'Luis Perez', 'usuario1@correo.com', '829-214-7612', '$2b$10$iTQJP/hsDSZvH1F8AY.nf.lK45O9s7fYsiOQShN7G1hsb7oeBxLc2', '2025-05-08 00:34:11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
