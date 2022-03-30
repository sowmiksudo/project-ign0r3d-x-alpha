-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 29, 2022 at 07:34 PM
-- Server version: 5.7.37-cll-lve
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alphasow_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `public_apis`
--

CREATE TABLE `public_apis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `config` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `public_apis`
--

INSERT INTO `public_apis` (`id`, `name`, `config`, `created_at`, `updated_at`) VALUES
(2, 'Shudokkho', '{\"url\": \"http://lpin.dev.mpower-social.com:6001/usermodule/otp_mobile/?mobile_no=0_MSISDN_&email=xbomber_public%40gmail.com&verification_type=registration\", \"body\": \"\", \"method\": \"get\", \"headers\": {\"accept\": \"application/json\", \"content-type\": \"application/x-www-form-urlencoded\"}}', '2022-03-29 12:32:58', '2022-03-29 12:32:58'),
(4, 'Cinespot', '{\"url\": \"http://www.cinespot.mobi/api/cinespot/v1/otp/sms/mobile-0_MSISDN_/operator-All/send\", \"body\": \"\", \"method\": \"get\", \"headers\": {\"content-type\": \"application/x-www-form-urlencoded\"}}', NULL, NULL),
(5, 'Jachai', '{\"url\": \"http://auth.jachai.com/api/v1/otp/send\", \"body\": \"{\\r\\n  \\\"mobileNumber\\\":\\\"0_MSISDN_\\\"\\r\\n}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:33:59', '2022-03-29 12:33:59'),
(6, 'Paikaree', '{\"url\": \"https://paikaree.com.bd/rampai/v1/user/set/otp\", \"body\": \"{\\\"mobile\\\":\\\"0_MSISDN_\\\"}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:34:13', '2022-03-29 12:34:13'),
(8, 'GuardianLYF', '{\"url\": \"http://api.myguardianbd.com/api/requestOtp?new=1&device_id=device&mobile=0_MSISDN_\", \"body\": \"\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/x-www-form-urlencoded\", \"Authorization\": \"Bearer ef9d4e34ba990125803cef38460d2d3fa86db5691397013f03fca316c3705090f27125f4e4cf34ef7921f2862023881ab4c3\"}}', '2022-03-29 12:34:44', '2022-03-29 12:34:44'),
(10, 'WebAccess', '{\"url\": \"http://27.131.15.19/lstyle/api/lsotprequest\", \"body\": \"{\\r\\n\\\"shortcode\\\":\\\"2494905\\\",\\r\\n \\\"msisdn\\\":\\\"880_MSISDN_\\\"\\r\\n}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:35:17', '2022-03-29 12:35:17'),
(11, 'Bkash', '{\"url\": \"https://account.bkash.com/personal-retail-account/gateway/api/public/otp/send\", \"body\": \"{\\r\\n  \\\"phoneNumber\\\": \\\"0_MSISDN_\\\",\\r\\n  \\\"phoneOperator\\\": \\\"ROBI_AIRTEL\\\"\\r\\n}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:35:31', '2022-03-29 12:35:31'),
(12, 'Green Delta', '{\"url\": \"https://backend-proc-prod-8953778245363662274.insumama.green-delta.com/token/user/otp\", \"body\": \"{\\\"mobileNo\\\":\\\"0_MSISDN_\\\"}\", \"method\": \"post\", \"headers\": {\"app-key\": \"sV+WD2bDZ|FAg7Pcx\", \"content-type\": \"application/json\"}}', '2022-03-29 12:35:45', '2022-03-29 12:35:45'),
(14, 'REDX', '{\"url\": \"https://api.redx.com.bd/v1/user/signup\", \"body\": \"{\\r\\n    \\\"name\\\": \\\"0_MSISDN_\\\",\\r\\n    \\\"phoneNumber\\\": \\\"0_MSISDN_\\\",\\r\\n    \\\"service\\\": \\\"redx\\\"\\r\\n}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:36:12', '2022-03-29 12:36:12'),
(15, 'Pickaboo', '{\"url\": \"https://www.pickaboo.com/rest/all/V1/sendotp?resend=0&storeId=1&mobile=0_MSISDN_&eventType=customer_signup_otp\", \"body\": \"\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:36:23', '2022-03-29 12:36:23'),
(16, 'Fundesh', '{\"url\": \"https://win.fundesh.com.bd/authSrv/auth/generateOtp\", \"body\": \"{\\r\\n  \\\"msisdn\\\": \\\"0_MSISDN_\\\",\\r\\n  \\\"clientId\\\": \\\"d2c_client\\\"\\r\\n}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:36:36', '2022-03-29 12:36:36'),
(22, 'Lecture', '{\"url\": \"https://lecturepublications.org/api/otpSend.php\", \"body\": \"{\\r\\n    \\\"mobile\\\": \\\"0_MSISDN_\\\",\\r\\n    \\\"source\\\": \\\"APP_v1.4\\\",\\r\\n    \\\"auth_key\\\": \\\"14yfRWHcneETqmLekE0F4jyViRURT1\\\"\\r\\n}\", \"method\": \"post\", \"headers\": {\"content-type\": \"application/json\"}}', '2022-03-29 12:37:56', '2022-03-29 12:37:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `public_apis`
--
ALTER TABLE `public_apis`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `public_apis`
--
ALTER TABLE `public_apis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
