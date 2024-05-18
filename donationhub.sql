-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2024 at 05:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `donationhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`) VALUES
('kanye', 'kanye254#'),
('kanye@gmail.com', 'Kanye254#'),
('dero@gmail.com', 'Kanye254#'),
('aggwb@gmail.com', 'Kanye254#');

-- --------------------------------------------------------

--
-- Table structure for table `donordetails`
--

CREATE TABLE `donordetails` (
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donordetails`
--

INSERT INTO `donordetails` (`firstname`, `lastname`, `address`, `email`) VALUES
('Griffins', 'Adero', '9277', 'adero890@gmail.com'),
('kit', 'ende', '550', 'gade6@gmail.com'),
('kit', 'ende', '550', 'gade6@gmail.com'),
('kit', 'ende', '550', 'gade6@gmail.com'),
('kit', 'ende', '550', 'gade6@gmail.com'),
('fk', 'sm', '89', 'gade8@gmail.com'),
('high', 'school', '560', 'gade4@gmail.com'),
('William', 'Boss', '9200, 40141', 'gade1998@gmail.com'),
('Griffins', 'Adero', '8000', 'okurut@gmail.com'),
('Kasuku', 'live', 'Pluto', 'kasuku@gmail.com'),
('Adero', 'Griff', 'Proxima Centauri', 'adero1999@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `donordonations`
--

CREATE TABLE `donordonations` (
  `donorid` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `donationID` varchar(100) NOT NULL,
  `Date` date NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donordonations`
--

INSERT INTO `donordonations` (`donorid`, `email`, `donationID`, `Date`, `location`) VALUES
('EF1001', 'adero564@gmail.com', '2099033TH', '2024-02-14', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1000DH1002', '2024-03-28', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1001DH1002', '2024-03-28', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1002DH1002', '2024-03-28', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1003DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1004DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1005DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1006DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1007DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1008DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1009DH1002', '2024-03-30', 'Kamukunji'),
('DH1002', 'adero890@gmail.com', 'DN1010DH1002', '2024-03-30', 'Kamukunji'),
('DH1018', 'kasuku@gmail.com', 'DN1000DH1018', '2024-03-30', 'Embakasi');

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `donorid` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`donorid`, `email`, `password`) VALUES
('EF1001', 'adero564@gmail.com', '$2b$10$rLJ7Ph.GbGL7yxSsa.Sou.GdyqU43f5kPgMObcsaa6RxhJRBXhuKO'),
('DH1002', 'adero890@gmail.com', '$2b$10$uPBc8Kl.XL.oAEEpyf1pYeu35WnBvNTt6K88GfgUMnXRhg1w5fJqu'),
('DH1003', 'joelambert@gmail.com', '$2b$10$/QMGStkk0a8wlWu8N1Rgv.U/MNQDKst/ciLvs4GtrcKLK.jTsD49e'),
('DH1005', 'skizzykartel256@gmail.com', '$2b$10$ffXn1R7HtJrmMeoKIjSB6.ge0pk4lkl2KHse8npiwAAApGZWJs146'),
('DH1001', 'dero67@gmail.com', '$2b$10$WmHTMMRdXl4GR2aUcDFRwuUhnCYFmLYfJX1wfoAVDQiuWY0ElMg0S'),
('DH1004', 'gray@gmail.com', '$2b$10$6LLfFGuGtPiQqXEMzadETOVAyApfiNR7ACrnsrkhnLj4As2JF6tuq'),
('DH1006', 'gray3@gmail.com', '$2b$10$BUJ5aQyCPdfiP3hCocmIcOcA8JyXOwxvCGP2O/k1o1XMOSUVBzz/O'),
('DH1007', 'gray4@gmail.com', '$2b$10$0TNW8uhEXJSq.XDLh1QmiOXnirnqcI1Vz78Piz.0/9GgGJy1FtEcu'),
('DH1008', 'gray5@gmail.com', '$2b$10$FTz5AVGntoBpqStvnHfg/eaI/xsuLTYbKVip/pqKpxKPNCHMh.nvS'),
('DH1009', 'gray6@gmail.com', '$2b$10$o7EexorybwPluk/Fvqj3NeBAAuCGEbkdsrD0c79KWlC8iEftpivAK'),
('DH1010', 'gray7@gmail.com', '$2b$10$k.fNnnY1yyyQUwECeT8oeeATIRQgOyB7CZlHX0ob.NvKZNmrPXljy'),
('DH1011', 'gade@gmail.com', '$2b$10$6ShaYxcG8AQTUNVxhrkv9uO4Mw0joZNEgLL/J9rnmo8RUsSWNoPNO'),
('DH1012', 'gade5@gmail.com', '$2b$10$cQ0o4ASANvdBqiQYgiokUOFH9pJ6tmOVW2vAO15/aQMbBkT4lUDg2'),
('DH1013', 'gade6@gmail.com', '$2b$10$V7cbAtaO4uulBSt.38QpOeQZx75IcHHBDFJ.dq7khWhCKaeNtzw0K'),
('DH1014', 'gade8@gmail.com', '$2b$10$MoM6zU/9wv.etju8zoo.8eqvYbQ3tkQMZE1Lh5xibD8Q278EEekSu'),
('DH1015', 'gade4@gmail.com', '$2b$10$ez.fQM2vYhUvmshzSdOz8.8AI/f7ONUl/YvWkY7vx/AlWgQH1./V.'),
('DH1016', 'gade1998@gmail.com', '$2b$10$kVytZro1AJMPwOudNAaeOu/mn7MeyA65POf56ra2orNO0xdiMfeCy'),
('DH1017', 'okurut@gmail.com', '$2b$10$.hFrwaXg4ki5lD/l1xqif.KhMug.L0VHa1a08ZARKuppS303vi0UK'),
('DH1018', 'kasuku@gmail.com', '$2b$10$Npo5Mq1XxpvuMdmiohrpF.4KbP4xOo5Hw0GdMAeLGLMAv8AVx7E4u'),
('DH1019', 'adero1999@gmail.com', '$2b$10$4sVxrUkxKYuniGOLvhLwa.vkuofZqLi0tMSeNE0bzbSzj9f8mMFw6');

-- --------------------------------------------------------

--
-- Table structure for table `volunteerdetails`
--

CREATE TABLE `volunteerdetails` (
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nearestcenter` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteerdetails`
--

INSERT INTO `volunteerdetails` (`firstname`, `lastname`, `address`, `email`, `nearestcenter`) VALUES
('Wanda', 'Proxima', 'Nebulla Cluster', 'peeps6@gmail.com', 'Roysambu'),
('Sampeke', 'Davis', 'Proxima Centauri', 'peke@gmail.com', 'Roysambu');

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `volunteerID` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`volunteerID`, `email`, `password`) VALUES
('VI1001', 'adero890@gmail.com', '$2b$10$sZPceZgZsloEV3ocY/vUXOnlZ6FLAgI/U.hWB1HunUrs/v2KEd7IW'),
('VI1002', 'dero67@gmail.com', '$2b$10$n5MLOplFg4eh9FOPZ6NloeLEVZPBAhlYSb6D9MHeplJ2dVXou2r4a'),
('VI1003', 'dero@gmail.com', '$2b$10$RAgzFfvJ0Tk.ZpZzeIY83.N7jJgKzKO3XuhnXZPKgFt8d2DEd7gUS'),
('VI1004', 'adero@gmail.com', '$2b$10$uRsh0eYQRtpfAOiWpysYZuIXcT0esCqXGdsSnkY81wTvm4u/XZCju'),
('VI1005', 'griff@gmail.com', '$2b$10$GR59Lxn10COrrmzMMuvDMOKYueIjcZQIsjT4jE.kugk5Kvlb5INd2'),
('VI1006', 'jeff@gmail.com', '$2b$10$mNB961JwehNkVxebErso7.Wbqg637iWP4QtfOoyqwdOzZyS5/WXsO'),
('VI1007', 'fif@gmail.com', '$2b$10$LKnT9C.jSKJFgoG/IYoD1.PjcPqe9QB7fCz60BLdjcDaUm60fAudy'),
('VI1008', 'kim@gmail.com', '$2b$10$yigCbRt63gwFAFJLVZzrDOJHXnU6zrIJRvp45DapRR6azC7rh0QZu'),
('VI1009', 'kimk@gmail.com', '$2b$10$3FBiaEP8T3YvSx8PKL6XIuCuZu2VSSAPtvBMwjJbHnt7TMHAEH1rq'),
('VI1010', 'kim2@gmail.com', '$2b$10$i.ovQvMlnya48hnt5D8N5.drocCZAB3eeDA68/hMxOtsmHublQrXC'),
('VI1011', 'peeps@gmail.com', '$2b$10$oCqcVC5gei0/9mC6y52iy.Gvce/ma9LQfAIsgRQan1mepLYe9Slz.'),
('VI1012', 'peeps2@gmail.com', '$2b$10$vmsYVtvvdvuuj1AYkZfAcOmn7iIIzj9Sm3PguSkxU1PVZCskMUJWO'),
('VI1013', 'peeps3@gmail.com', '$2b$10$VZDzqWAkTmNVaQiXqzHqzOgjWoAVB9uXzLIELsRhg0FfXgNBuqw8y'),
('VI1014', 'peep4@gmai.com', '$2b$10$NFCbhM9MIWPSwsD2GsYlHeoWRS5aSTxmQy1CwvFtBFCk5MQEcBlTe'),
('VI1015', 'peeps5@gmail.com', '$2b$10$ujCRJ9feg6tucbzo7Km6Y.yGNGIBiNgBSpZjvJ2An633TljcyfDCC'),
('VI1016', 'peeps6@gmail.com', '$2b$10$nomXzYWZQUr9dQiFlIqvD.YVCXOivyDtTHHjd1xefZZIAF3QrBzzu'),
('VI1017', 'peke@gmail.com', '$2b$10$4P61XRFivpZ.qNfgTHV8UuQcVinXQJwaQrJw7TBOj1KyY67j6LhGi');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
