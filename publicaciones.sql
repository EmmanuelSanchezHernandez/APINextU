-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql3.freemysqlhosting.net
-- Tiempo de generación: 23-03-2021 a las 03:30:20
-- Versión del servidor: 5.5.54-0ubuntu0.12.04.1
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sql3399733`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `resumen` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `contenido` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int(11) DEFAULT '0',
  `fecha_hora` timestamp NULL DEFAULT NULL,
  `autor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `titulo`, `resumen`, `contenido`, `foto`, `votos`, `fecha_hora`, `autor_id`) VALUES
(1, 'Roma', 'Buen viaje a Roma', 'Contenido', NULL, 0, '2018-09-10 01:08:27', 1),
(4, 'Costa Rica', 'Buen viaje a Costa Rica', 'Contenido', NULL, 0, '2018-09-13 01:08:27', 2),
(5, 'Mar de Plata', 'Buen viaje a Mar de Plata', 'Contenido', NULL, 0, '2018-09-14 01:08:27', 2),
(6, 'Guadalajara', 'Buen viaje a Guadalajara', 'Contenido', NULL, 0, '2018-09-15 01:08:27', 2),
(7, 'China', 'Buen viaje a China', 'Contenido', NULL, 2, '2018-09-16 01:08:27', 2),
(8, 'Panam', 'Hola Panam', 'Nuestro viaje a <strong>panam', NULL, 2, '2018-09-16 01:08:27', 2),
(9, 'Prueba', 'Prueba', 'Prueba', NULL, 0, '2021-03-10 00:00:00', 3),
(10, 'Prua', 'Prue', 'prueba', NULL, 0, '2021-03-01 00:00:00', 2),
(18, 'Pruebas chalala', 'Pruebas chalala', 'Pruebas chalala', NULL, 0, '2021-03-12 00:00:00', 5),
(19, 'Pruebas chalala', 'Pruebas chalala', 'Pruebas chalala', NULL, 0, '2021-03-29 00:00:00', 5),
(20, 'pRUEBA MEXICO', 'pRUEBA MEXICO', 'Prueba mexico', NULL, 0, '2021-03-18 00:00:00', 4),
(21, 'pRUEBA MEXICO', 'pRUEBA MEXICO', 'Prueba mexico', NULL, 0, '2021-02-10 00:00:00', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_publicaciones_autores_idx` (`autor_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `fk_publicaciones_autores` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
