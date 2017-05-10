-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 10, 2017 at 04:41 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Olympic_Art`
--

-- --------------------------------------------------------

--
-- Table structure for table `olympic_nations`
--

CREATE TABLE `olympic_nations` (
  `Nation` varchar(14) DEFAULT NULL,
  `Rk` varchar(2) DEFAULT NULL,
  `Total Gold` varchar(2) DEFAULT NULL,
  `Total Silver` varchar(2) DEFAULT NULL,
  `Total Bronze` varchar(2) DEFAULT NULL,
  `Total Medals` varchar(3) DEFAULT NULL,
  `Total Entries` varchar(4) DEFAULT NULL,
  `% Medals / Entrants` varchar(4) DEFAULT NULL,
  `Indiv. Artists` varchar(4) DEFAULT NULL,
  `Men` varchar(4) DEFAULT NULL,
  `Women` varchar(3) DEFAULT NULL,
  `% Women` varchar(3) DEFAULT NULL,
  `Women Medalists` varchar(2) DEFAULT NULL,
  `Host Year` varchar(15) DEFAULT NULL,
  `% of natl. medals from hosting` varchar(3) DEFAULT NULL,
  `% of intl. medals during host year` varchar(3) DEFAULT NULL,
  `% to allies` varchar(3) DEFAULT NULL,
  `% left` varchar(3) DEFAULT NULL,
  `Medals as Host` varchar(2) DEFAULT NULL,
  `1912 Medals` varchar(1) DEFAULT NULL,
  `1920 Medals` varchar(2) DEFAULT NULL,
  `1924 Medals` varchar(2) DEFAULT NULL,
  `1928 Medals` varchar(2) DEFAULT NULL,
  `1932 Medals` varchar(2) DEFAULT NULL,
  `1936 Medals` varchar(2) DEFAULT NULL,
  `1948 Medals` varchar(2) DEFAULT NULL,
  `Architecture Participants` varchar(3) DEFAULT NULL,
  `Arch. Medal / Participant %` varchar(4) DEFAULT NULL,
  `Architecture Gold` varchar(1) DEFAULT NULL,
  `Architecture Silver` varchar(2) DEFAULT NULL,
  `Architecture Bronze` varchar(1) DEFAULT NULL,
  `Architecture Medals` varchar(2) DEFAULT NULL,
  `Literature Participants` varchar(3) DEFAULT NULL,
  `Lit. Medal / Participant %` varchar(4) DEFAULT NULL,
  `Literature Gold` varchar(2) DEFAULT NULL,
  `Literature Silver` varchar(2) DEFAULT NULL,
  `Literature Bronze` varchar(1) DEFAULT NULL,
  `Literature Medals` varchar(2) DEFAULT NULL,
  `Music Participants` varchar(3) DEFAULT NULL,
  `Music Medal / Participant %` varchar(3) DEFAULT NULL,
  `Music Gold` varchar(1) DEFAULT NULL,
  `Music Silver` varchar(1) DEFAULT NULL,
  `Music Bronze` varchar(1) DEFAULT NULL,
  `Music Medals` varchar(2) DEFAULT NULL,
  `Painting Participants` varchar(3) DEFAULT NULL,
  `Painting Medal / Participant %` varchar(3) DEFAULT NULL,
  `Painting Gold` varchar(2) DEFAULT NULL,
  `Painting Silver` varchar(2) DEFAULT NULL,
  `Painting Bronze` varchar(2) DEFAULT NULL,
  `Painting Medals` varchar(2) DEFAULT NULL,
  `Sculpture Participants` varchar(3) DEFAULT NULL,
  `Sculpture Medal / Participant %` varchar(3) DEFAULT NULL,
  `Sculpture Gold` varchar(2) DEFAULT NULL,
  `Sculpture Silver` varchar(2) DEFAULT NULL,
  `Sculpture Bronze` varchar(2) DEFAULT NULL,
  `Sculpture Medals` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `olympic_nations`
--

INSERT INTO `olympic_nations` (`Nation`, `Rk`, `Total Gold`, `Total Silver`, `Total Bronze`, `Total Medals`, `Total Entries`, `% Medals / Entrants`, `Indiv. Artists`, `Men`, `Women`, `% Women`, `Women Medalists`, `Host Year`, `% of natl. medals from hosting`, `% of intl. medals during host year`, `% to allies`, `% left`, `Medals as Host`, `1912 Medals`, `1920 Medals`, `1924 Medals`, `1928 Medals`, `1932 Medals`, `1936 Medals`, `1948 Medals`, `Architecture Participants`, `Arch. Medal / Participant %`, `Architecture Gold`, `Architecture Silver`, `Architecture Bronze`, `Architecture Medals`, `Literature Participants`, `Lit. Medal / Participant %`, `Literature Gold`, `Literature Silver`, `Literature Bronze`, `Literature Medals`, `Music Participants`, `Music Medal / Participant %`, `Music Gold`, `Music Silver`, `Music Bronze`, `Music Medals`, `Painting Participants`, `Painting Medal / Participant %`, `Painting Gold`, `Painting Silver`, `Painting Bronze`, `Painting Medals`, `Sculpture Participants`, `Sculpture Medal / Participant %`, `Sculpture Gold`, `Sculpture Silver`, `Sculpture Bronze`, `Sculpture Medals`) VALUES
('Germany', '1', '8', '7', '9', '24', '252', '9.52', '191', '184', '7', '3.7', '1', '1936, Berlin', '50', '37.', '31.', '31.', '12', '1', '0', '0', '8', '3', '12', '0', '60', '10', '2', '1', '3', '6', '14', '42.9', '3', '3', '0', '6', '8', '50', '2', '1', '1', '4', '94', '4.3', '0', '1', '3', '4', '76', '5.3', '1', '1', '2', '4'),
('Italy', '2', '5', '7', '2', '14', '138', '10.1', '119', '114', '5', '4.2', '0', '', '', '', '', '', '', '2', '2', '0', '1', '0', '5', '4', '33', '0', '0', '0', '0', '0', '15', '26.7', '2', '2', '0', '4', '8', '62.', '1', '2', '2', '5', '39', '7.7', '1', '2', '0', '3', '43', '4.7', '1', '1', '0', '2'),
('France', '3', '4', '4', '5', '13', '203', '6.4', '180', '161', '19', '10.', '1', '1924, Paris', '23.', '21.', '', '78.', '3', '1', '1', '3', '2', '3', '0', '3', '35', '8.6', '1', '1', '1', '3', '20', '15', '1', '0', '2', '3', '8', '0', '0', '0', '0', '0', '68', '4.4', '1', '2', '0', '3', '72', '5.6', '1', '1', '2', '4'),
('USA', '4', '4', '5', '0', '9', '304', '2.96', '267', '217', '50', '18.', '1', '1932, L.A.', '77.', '30.', '', '69.', '7', '1', '0', '0', '0', '7', '1', '0', '54', '3.7', '0', '2', '0', '2', '9', '0', '0', '0', '0', '0', '24', '0', '0', '0', '0', '0', '145', '2.8', '2', '2', '0', '4', '72', '4.2', '2', '1', '0', '3'),
('Great Britain', '5', '3', '5', '1', '9', '196', '4.59', '151', '125', '26', '17.', '3', '1948, London', '44.', '12.', '', '87.', '4', '0', '1', '1', '2', '1', '0', '4', '8', '12.5', '1', '0', '0', '1', '8', '25', '0', '2', '0', '2', '2', '0', '0', '0', '0', '0', '153', '2.6', '2', '2', '0', '4', '25', '8', '0', '1', '1', '2'),
('Austria', '6', '3', '3', '3', '9', '128', '7.03', '108', '101', '7', '6.5', '0', '', '', '', '', '', '', '0', '0', '0', '1', '0', '4', '4', '29', '13.8', '2', '1', '1', '4', '16', '6.3', '0', '0', '1', '1', '7', '0', '0', '0', '0', '0', '46', '2.2', '0', '1', '0', '1', '30', '10', '1', '1', '1', '3'),
('Denmark', '7', '0', '5', '4', '9', '63', '14.2', '51', '47', '4', '7.8', '0', '', '', '', '', '', '', '0', '0', '2', '3', '2', '0', '2', '21', '9.5', '0', '2', '0', '2', '7', '57.1', '0', '3', '1', '4', '4', '50', '0', '0', '2', '2', '17', '0', '0', '0', '0', '0', '14', '7.1', '0', '0', '1', '1'),
('Poland', '8', '3', '2', '3', '8', '107', '7.48', '93', '75', '18', '19.', '1', '', '', '', '', '', '', '0', '0', '0', '2', '2', '3', '1', '3', '0', '0', '0', '0', '0', '4', '50', '1', '0', '1', '2', '6', '16.', '1', '0', '0', '1', '70', '4.3', '0', '1', '2', '3', '24', '8.3', '1', '1', '0', '2'),
('Belgium', '9', '2', '1', '5', '8', '93', '8.6', '86', '77', '9', '10.', '0', '1920, Antwerp', '75', '54.', '', '45.', '6', '0', '6', '0', '0', '1', '1', '0', '9', '11.1', '0', '0', '1', '1', '6', '16.7', '0', '0', '1', '1', '4', '25', '1', '0', '0', '1', '31', '3.2', '0', '0', '1', '1', '43', '9.3', '1', '1', '2', '4'),
('Switzerland', '10', '2', '4', '1', '7', '87', '8.05', '68', '65', '3', '4.4', '0', '', '', '', '', '', '', '1', '0', '0', '2', '0', '1', '3', '11', '18.2', '1', '1', '0', '2', '20', '0', '0', '0', '0', '0', '12', '0', '0', '0', '0', '0', '17', '23.', '1', '2', '1', '4', '27', '3.7', '0', '1', '0', '1'),
('Holland', '11', '2', '1', '3', '6', '144', '4.17', '114', '101', '13', '11.', '1', '1928, Amsterdam', '66.', '13.', '', '86.', '4', '0', '0', '1', '4', '1', '0', '0', '21', '4.8', '1', '0', '0', '1', '7', '14.3', '0', '0', '1', '1', '5', '0', '0', '0', '0', '0', '97', '3.1', '1', '0', '2', '3', '14', '7.1', '0', '1', '0', '1'),
('Finland', '12', '3', '1', '1', '5', '9', '55.5', '9', '8', '1', '11.', '1', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '4', '2', '100', '1', '0', '1', '2', '4', '50', '2', '0', '0', '2', '2', '50', '0', '1', '0', '1', '0', '', '1', '2', '3', '4', '1', '0', '0', '0', '0', '0'),
('Sweden', '13', '2', '0', '2', '4', '59', '6.78', '50', '47', '3', '6', '0', '1912, Stockholm', '0', '0', '', '100', '0', '0', '0', '0', '0', '1', '1', '2', '7', '14.3', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '29', '3.4', '1', '0', '0', '1', '22', '9.1', '1', '0', '1', '2'),
('Hungary', '14', '1', '2', '1', '4', '31', '12.9', '24', '22', '2', '8.3', '1', '', '', '', '', '', '', '0', '0', '1', '1', '1', '0', '1', '8', '12.5', '0', '1', '0', '1', '13', '15.4', '1', '0', '1', '2', '0', '', '0', '0', '0', '0', '6', '0', '0', '0', '0', '0', '4', '25', '0', '1', '0', '1'),
('Luxembourg', '15', '2', '1', '0', '3', '14', '21.4', '10', '9', '1', '10', '0', '', '', '', '', '', '', '0', '0', '2', '1', '0', '0', '0', '0', '', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '9', '22.', '2', '0', '0', '2', '4', '25', '0', '1', '0', '1'),
('Czechoslovakia', '16', '0', '1', '2', '3', '56', '5.36', '51', '48', '3', '5.9', '0', '', '', '', '', '', '', '0', '0', '0', '0', '2', '1', '0', '17', '0', '0', '0', '0', '0', '3', '0', '0', '0', '0', '0', '6', '33.', '0', '1', '1', '2', '10', '0', '0', '0', '0', '0', '20', '5', '0', '0', '1', '1'),
('Ireland', '17', '0', '1', '2', '3', '38', '7.89', '31', '21', '10', '32.', '1', '', '', '', '', '', '', '0', '0', '2', '0', '0', '0', '1', '0', '', '0', '0', '0', '0', '5', '20', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '27', '7.4', '0', '1', '1', '2', '5', '0', '0', '0', '0', '0'),
('Canada', '18', '0', '1', '1', '2', '30', '6.67', '24', '18', '6', '25', '0', '', '', '', '', '', '', '0', '0', '0', '0', '1', '0', '1', '4', '0', '0', '0', '0', '0', '4', '0', '0', '0', '0', '0', '9', '11.', '0', '1', '0', '1', '6', '0', '0', '0', '0', '0', '7', '14.', '0', '0', '1', '1'),
('South Africa', '19', '0', '1', '1', '2', '12', '16.6', '24', '18', '6', '25', '0', '', '', '', '', '', '', '0', '0', '0', '0', '0', '0', '2', '0', '', '0', '0', '0', '0', '1', '100', '0', '1', '0', '1', '0', '', '0', '0', '0', '0', '9', '11.', '0', '0', '1', '1', '2', '0', '0', '0', '0', '0'),
('Japan', '20', '0', '0', '2', '2', '95', '2.11', '94', '90', '4', '4.3', '0', '', '', '', '', '', '', '0', '0', '0', '0', '0', '2', '0', '5', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0', '72', '2.8', '0', '0', '2', '2', '13', '0', '0', '0', '0', '0'),
('Greece', '21', '1', '0', '0', '1', '7', '14.2', '7', '7', '0', '0', '0', '', '', '', '', '', '', '0', '0', '1', '0', '0', '0', '0', '3', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '2', '50', '1', '0', '0', '1'),
('Norway', '22', '0', '1', '0', '1', '11', '9.09', '8', '6', '2', '25', '0', '', '', '', '', '', '', '0', '1', '0', '0', '0', '0', '0', '3', '33.3', '0', '1', '0', '1', '0', '', '0', '0', '0', '0', '4', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '2', '0', '0', '0', '0', '0'),
('Monaco', '23', '0', '0', '1', '1', '6', '16.6', '4', '4', '0', '0', '0', '', '', '', '', '', '', '0', '0', '1', '0', '0', '0', '0', '3', '33.3', '0', '0', '1', '1', '0', '', '0', '0', '0', '0', '2', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0'),
('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
('TOTALS', '', '45', '53', '49', '147', '2083', '', '1764', '1565', '199', '11.', '11', '', '', '', '', '', '36', '6', '11', '14', '27', '25', '32', '32', '336', '', '9', '10', '9', '28', '159', '', '10', '11', '9', '30', '117', '', '5', '6', '6', '17', '948', '', '12', '16', '16', '42', '522', '', '10', '12', '12', '34');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
