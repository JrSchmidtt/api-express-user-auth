-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.24-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para api_user_auth
CREATE DATABASE IF NOT EXISTS `api_user_auth` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `api_user_auth`;

-- Copiando estrutura para tabela api_user_auth.api_users
CREATE TABLE IF NOT EXISTS `api_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela api_user_auth.api_users: ~7 rows (aproximadamente)
INSERT INTO `api_users` (`id`, `name`, `email`, `password`, `role`) VALUES
	(14, 'usuario', 'teste@gmail.com', '$2b$04$qFOdyuleXe4nInS2ca28/.pPQ5VabWMoadnhctJno42n6c3OTwI0m', 0),
	(15, 'Ulrich', 'uwilfing0@dion.ne.jp', '$2b$04$UgTfI2ut8CKbFNJQalDn3uTf//uaUrUs/NbAHdsMusaHnLRFHuk/C', 0),
	(16, 'Lucius', 'ldorosario1@weather.com', '$2b$04$TMazpQyyOoED4CNunNoOSOHB/nMT87YOSfNwVNgDO3Aosulv1k9bW', 0),
	(17, 'Phyllida', 'pballston2@cyberchimps.com', '$2b$04$BwLC8JTx7RM9PBU8jxIIx.3vdqmfB6xaFzC0.A6L3ee9SwzFX2JtS', 0),
	(18, 'Kippie', 'keisold3@php.net', '$2b$04$pkkL0iAlt.UZv7e9WMfZm.5/WghWcpEITYDzziHgfwi/GvdVF0.2O', 0),
	(19, 'Dixie', 'dfurber4@sakura.ne.jp', '$2b$04$3weKLfUewBu/FPWE11874ep/wYvRK9fFXXgpYfu7h0pHe2aGeUnU2', 0),
	(25, 'admin', 'admin@server.com', '$2b$04$CbPIxT712szRWxd0BR7gseqgZFtKHJgE6ZN4aOfLwO1MiYRj6Hyfy', 1);

-- Copiando estrutura para tabela api_user_auth.passwordtokens
CREATE TABLE IF NOT EXISTS `passwordtokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `user_id` int(11) unsigned NOT NULL DEFAULT 0,
  `used` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_passwordtokens_api_users` (`user_id`),
  CONSTRAINT `FK_passwordtokens_api_users` FOREIGN KEY (`user_id`) REFERENCES `api_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela api_user_auth.passwordtokens: ~4 rows (aproximadamente)
INSERT INTO `passwordtokens` (`id`, `token`, `user_id`, `used`) VALUES
	(16, 'dc907a89-9097-47c1-b951-3f64244ff59a', 16, 0),
	(17, 'db7e518c-db69-4711-86a2-1561544cfb17', 16, 0),
	(18, '9f97107e-d048-4c10-9c1a-60f09d2ca008', 16, 1),
	(19, '1f380764-df34-4910-93bb-cd18abc50132', 16, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
