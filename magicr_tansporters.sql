-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2024 at 03:45 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magicr_tansporters`
--

-- --------------------------------------------------------

--
-- Table structure for table `magic_items`
--

CREATE TABLE `magic_items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `magic_items`
--

INSERT INTO `magic_items` (`id`, `name`, `weight`, `trip_id`, `createdAt`, `updatedAt`) VALUES
(3, 'trousers2', 19, 3, '2024-04-21 14:13:17', '2024-04-21 14:13:17'),
(4, 'trousers', 19, 3, '2024-04-21 14:13:22', '2024-04-21 14:13:22'),
(5, 'product 1', 19, 2, '2024-04-21 14:23:10', '2024-04-21 14:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `magic_movers`
--

CREATE TABLE `magic_movers` (
  `id` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `energy` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `magic_movers`
--

INSERT INTO `magic_movers` (`id`, `weight`, `energy`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 500, 900, 2, '2024-04-21 14:00:38', '2024-04-21 14:00:38');

-- --------------------------------------------------------

--
-- Table structure for table `mover_logs`
--

CREATE TABLE `mover_logs` (
  `id` int(11) NOT NULL,
  `state` enum('init','resting','loading','on_mission','done') NOT NULL,
  `trip_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mover_logs`
--

INSERT INTO `mover_logs` (`id`, `state`, `trip_id`, `createdAt`) VALUES
(1, 'resting', 3, '2024-04-21 14:17:34'),
(2, 'loading', 3, '2024-04-21 14:18:14'),
(3, 'on_mission', 3, '2024-04-21 14:19:43'),
(4, 'resting', 3, '2024-04-21 14:20:23'),
(5, 'done', 3, '2024-04-21 14:20:29'),
(6, 'loading', 2, '2024-04-21 14:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `refresh_token` varchar(1000) DEFAULT NULL,
  `deviceId` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refresh_token`
--

INSERT INTO `refresh_token` (`id`, `user_id`, `refresh_token`, `deviceId`, `ip`, `createdAt`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MGNhN2Y4YmMxMTNmOTVhMDgyYmE5OTMxYTg3NDExMDQ3YTBiNTUxZWRiNDFjOWIwZTllYTExYTdhMGQyYzc4MDgxNDg1Njk1NzkzODFhODk5ZjMyZTBmYjhmOTU5MWUyNSIsImlhdCI6MTcxMzcwODAwNiwiZXhwIjoxNzI2NjY4MDA2fQ.rybnFmNLIVVXea1HlT-3Hbx0NIzXLOKDjfFSaVXI_2Y', '4ace2c5a-fbf3-4edf-ab38-20a855dc5403', '::1', '2024-04-21 14:00:06'),
(2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJlODRlNDAzNzVlNGYzMjk5OWI3OGI1ODg1MDhiOTJlMTQ5OTI1MTg5OTU2ZDZiNWYzOWU2Y2RlYjE3YWYyNDc5OGY4ODU0NmYxYmMzNmYzNjZjZWMwZDQ2MmQ2MzQ0ZTFiZmE5MDgwM2M3N2I0NWZiZGFhZWJlYjY1YmZiZmEwMCIsImlhdCI6MTcxMzcwODA0OCwiZXhwIjoxNzI2NjY4MDQ4fQ.axXHOcG1F8E9-pGxwG_utaEKOST93EzrYencRmaJZ1o', '2f209ab8-12a5-470a-831c-3ec79f0f06c9', '::1', '2024-04-21 14:00:48'),
(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MDAwMDQwNWNjNDc1NDk3MzZkYjYzMGFjYzdlYzE3Njc4MjUxYmNjYWIzZjAyM2I5Njc0NTk5OTJiMmIzNTk4M2UxZTQ0ZjMwMzI5NWRlYWFiZmQ4NDFiZjNlZmQxMDQ0YSIsImlhdCI6MTcxMzcwOTk1MCwiZXhwIjoxNzI2NjY5OTUwfQ.5Q8P2NUEen86x46Y_ZOe_ynyoi0y42Ia27gakhDYLfc', 'cc14b804-78bc-44c6-89e0-a454f675cfc1', '::1', '2024-04-21 14:32:30'),
(5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MGIyOTJmNmM0MWEzZGVkN2ViYmEzZDQ4NDA5ZTcyMmMzNGQ5YTdmYjk2ODI0MzNhMjU2ZjNhOWQyZjFhYWY5MjZiOGNjNzJkNWRlZGZlZGQwOGNhY2U2ODNiNzgxODU5ZSIsImlhdCI6MTcxMzcxMzY3OCwiZXhwIjoxNzI2NjczNjc4fQ.0umS4ork8fNSynAXZpkA25FxoZEtl-4sCMs7ddJNShY', '5e35ecb9-efa7-4949-8704-1cdadcc9d03e', '::1', '2024-04-21 15:34:38'),
(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MDU3Mzk4YTc3N2UyYjZjOTM1Yzg0NmQ3NzI2Y2RlM2Q4Mzk3OTU5MmUwNTZlZmM2MWViOTIwZWEyOTFkOWRiZjk1N2U3MjVlMGU5MjVkNjQwNGJmODRiMTAxYjQ1ZTRhZSIsImlhdCI6MTcxMzcxMzY5MCwiZXhwIjoxNzI2NjczNjkwfQ._S4Gg7bigVLOOoWheV2afae6MT5XJCOe1VeapuWp1MY', 'fbb0e4f5-f7c1-4e95-ad5a-83d41a93a068', '::1', '2024-04-21 15:34:50'),
(7, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MGYxM2ZkODQwY2JlYTJkNWM5YzIzYzM2OTY3NGRjNDY0OWVjMzZmMGFlZjdjZWI3ZDMyZGQ0YTg4ZDYxMjEwYmU3NzIwYzRlNTA3MWU2OTU5NmZlMTVmMDFiNGJhZWQ1ZiIsImlhdCI6MTcxMzcxMzcxMSwiZXhwIjoxNzI2NjczNzExfQ.Uat3Nbt0ohE_1iuhfAaua1OYkAku3pAeeZnOI52CWLk', '58344c30-b45d-40ab-aaab-3298edd57eb0', '::1', '2024-04-21 15:35:11'),
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MDlmZmNkNzhjZDkxNjE5ZjQ5ODE1ZGFlMTY1ZGIzY2NjNjgxY2UyYjI4MDRjMTcxM2RiZGVjMjRiOTExNTdmYWYyOWQ2YTFhZjQzYzI4NzIyMmFjN2FmNDRmMjI1ZWExNiIsImlhdCI6MTcxMzcxNTE1NiwiZXhwIjoxNzI2Njc1MTU2fQ.x3uOzX05VSLAkmtkKgK0Ruvfd9akLSVZbhhJmKCaJ94', '29904f15-6892-4267-9356-0fa2e810effd', '::1', '2024-04-21 15:59:16'),
(11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJiYWQzNDJkMDk0ZDNlNTk5OWU2MmE5Mjk4ZDc3ZTM1MDZmNjkzMjJmZDk1M2Q5NjU4NGI5M2Q2MWUyZGIzZjc3NGQ0MTAwM2MxMDZhZmI3NTliMzc5OGJiMDc0MzEzMThjYTkwMTk0ODMwMTNkNWE3MzJkZGI4ODJhMzA3NmY0YiIsImlhdCI6MTcxMzcxNTkyMywiZXhwIjoxNzI2Njc1OTIzfQ.stbEUYktYIlycmT85TV9j0EQJSmPW0Z4bKL9kY_Kl9Y', '25bd1e73-839b-4517-bae7-68920c72b682', '::ffff:127.0.0.1', '2024-04-21 16:12:03');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `quest_state` enum('init','resting','loading','on_mission','done') NOT NULL,
  `magic_mover_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `name`, `quest_state`, `magic_mover_id`, `createdAt`) VALUES
(2, 'second move', 'loading', 1, '2024-04-21 14:01:37'),
(3, 'first move', 'done', 1, '2024-04-21 14:13:03'),
(4, 'third move', 'init', 1, '2024-04-21 14:21:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `verification_email` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `role` enum('mover','admin') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `verification_email`, `picture`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrator', 'admin@gmail.com', '$2a$12$bPQdW3qHaht8OnjNc1nl3uRPGeipS0ZX33knY.AMkdkaChV1Nbo2C', '1', NULL, 'admin', '2024-04-21 13:59:44', '2024-04-21 13:59:44'),
(2, 'Raed Al Masri', 'raed.almasri210201@gmail.com', '$2a$12$KDGMMO./9AtFlX10tOfcf.bIFh5u3ja5Lwi6z5khAUv7L2dmhU6k.', '0', NULL, 'mover', '2024-04-21 14:00:27', '2024-04-21 14:00:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `magic_items`
--
ALTER TABLE `magic_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`);

--
-- Indexes for table `magic_movers`
--
ALTER TABLE `magic_movers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `mover_logs`
--
ALTER TABLE `mover_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`);

--
-- Indexes for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `magic_mover_id` (`magic_mover_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `email_index` (`email`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `magic_items`
--
ALTER TABLE `magic_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `magic_movers`
--
ALTER TABLE `magic_movers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mover_logs`
--
ALTER TABLE `mover_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `magic_items`
--
ALTER TABLE `magic_items`
  ADD CONSTRAINT `magic_items_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `magic_movers`
--
ALTER TABLE `magic_movers`
  ADD CONSTRAINT `magic_movers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mover_logs`
--
ALTER TABLE `mover_logs`
  ADD CONSTRAINT `mover_logs_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`magic_mover_id`) REFERENCES `magic_movers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
