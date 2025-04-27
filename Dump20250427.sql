-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: thu_vien
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id_gui` int NOT NULL,
  `id_nhan` int NOT NULL,
  `nd` varchar(255) DEFAULT NULL,
  `time` datetime NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `loai` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4vd6rxdf8thuy9ll1fw60clwa` (`id_gui`),
  KEY `FKfwasal4j1m0gtdocqbb973l5i` (`id_nhan`),
  CONSTRAINT `FK4vd6rxdf8thuy9ll1fw60clwa` FOREIGN KEY (`id_gui`) REFERENCES `user` (`id`),
  CONSTRAINT `FKfwasal4j1m0gtdocqbb973l5i` FOREIGN KEY (`id_nhan`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (8,2,'hello','2025-04-23 13:12:15',1,'string'),(2,8,'sao vậy bạn?','2025-04-23 13:12:28',2,'string'),(8,2,'không có gì','2025-04-23 13:12:36',3,'string'),(8,1,'hello','2025-04-24 18:45:07',4,'string'),(8,4,'hello','2025-04-24 18:48:01',5,'string'),(8,5,'hello','2025-04-24 18:50:23',6,'string'),(8,6,'hello','2025-04-24 18:50:47',7,'string'),(8,4,'wtf','2025-04-24 18:51:48',8,'string'),(8,2,'hello','2025-04-24 18:54:43',9,'string'),(8,3,'thuwr','2025-04-24 19:08:02',10,'string'),(2,8,'hello','2025-04-25 16:07:40',11,'string');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_gia`
--

DROP TABLE IF EXISTS `danh_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_gia` (
  `id_nguoi` int NOT NULL,
  `id_sach` int NOT NULL,
  `nd` varchar(255) DEFAULT NULL,
  `time` datetime NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK17mwax4auhu60b44qd1a6huts` (`id_sach`),
  KEY `FK2rnwd5x33o64q991f3aq9jplr` (`id_nguoi`),
  CONSTRAINT `FK17mwax4auhu60b44qd1a6huts` FOREIGN KEY (`id_sach`) REFERENCES `sach` (`id`),
  CONSTRAINT `FK2rnwd5x33o64q991f3aq9jplr` FOREIGN KEY (`id_nguoi`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_gia`
--

LOCK TABLES `danh_gia` WRITE;
/*!40000 ALTER TABLE `danh_gia` DISABLE KEYS */;
INSERT INTO `danh_gia` VALUES (8,2,'sách này hay phết','2025-04-23 13:09:25',1),(2,2,'Ồ vậy sao!','2025-04-23 13:11:14',2);
/*!40000 ALTER TABLE `danh_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_gia_seq`
--

DROP TABLE IF EXISTS `danh_gia_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_gia_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_gia_seq`
--

LOCK TABLES `danh_gia_seq` WRITE;
/*!40000 ALTER TABLE `danh_gia_seq` DISABLE KEYS */;
INSERT INTO `danh_gia_seq` VALUES (101);
/*!40000 ALTER TABLE `danh_gia_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muon_tra`
--

DROP TABLE IF EXISTS `muon_tra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muon_tra` (
  `id_nguoi` int NOT NULL,
  `id_sach` int NOT NULL,
  `ngay_muon` datetime DEFAULT NULL,
  `ngay_tra` datetime DEFAULT NULL,
  `trang_thai` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK6yw53cygxf37svsagoc50nlby` (`id_sach`),
  KEY `FKkj7p5483hwbhla9w3lbq7fln` (`id_nguoi`),
  CONSTRAINT `FK6yw53cygxf37svsagoc50nlby` FOREIGN KEY (`id_sach`) REFERENCES `sach` (`id`),
  CONSTRAINT `FKkj7p5483hwbhla9w3lbq7fln` FOREIGN KEY (`id_nguoi`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muon_tra`
--

LOCK TABLES `muon_tra` WRITE;
/*!40000 ALTER TABLE `muon_tra` DISABLE KEYS */;
INSERT INTO `muon_tra` VALUES (8,2,'2025-04-23 13:09:35','2025-04-23 13:11:45','da_tra',1);
/*!40000 ALTER TABLE `muon_tra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muon_tra_seq`
--

DROP TABLE IF EXISTS `muon_tra_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muon_tra_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muon_tra_seq`
--

LOCK TABLES `muon_tra_seq` WRITE;
/*!40000 ALTER TABLE `muon_tra_seq` DISABLE KEYS */;
INSERT INTO `muon_tra_seq` VALUES (51);
/*!40000 ALTER TABLE `muon_tra_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sach`
--

DROP TABLE IF EXISTS `sach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sach` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sl` int NOT NULL,
  `danh_muc` varchar(255) DEFAULT NULL,
  `tac_gia` varchar(255) DEFAULT NULL,
  `avt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sach`
--

LOCK TABLES `sach` WRITE;
/*!40000 ALTER TABLE `sach` DISABLE KEYS */;
INSERT INTO `sach` VALUES (1,'Sách 1',10,'Khoa học','Tác giả 1','/images/sachMD.jpg'),(2,'Sách 2',5,'Lịch sử','Tác giả 2','/images/sachMD.jpg'),(3,'Sách 3',12,'Văn học','Tác giả 3','/images/sachMD.jpg'),(4,'Sách 4',3,'Toán học','Tác giả 4','/images/sachMD.jpg'),(5,'Sách 5',7,'Khoa học','Tác giả 5','/images/sachMD.jpg'),(6,'Sách 6',6,'Lập trình','Tác giả 6','/images/sachMD.jpg'),(7,'Sách 7',9,'Tiểu thuyết','Tác giả 7','/images/sachMD.jpg'),(8,'Sách 8',4,'Trinh thám','Tác giả 8','/images/sachMD.jpg'),(9,'Sách 9',8,'Triết học','Tác giả 9','/images/sachMD.jpg'),(10,'Sách 10',11,'Văn học','Tác giả 10','/images/sachMD.jpg'),(11,'Sách 11',13,'Kinh doanh','Tác giả 11','/images/sachMD.jpg'),(12,'Sách 12',2,'Tâm lý học','Tác giả 12','/images/sachMD.jpg'),(13,'Sách 13',5,'Kỹ năng','Tác giả 13','/images/sachMD.jpg'),(14,'Sách 14',7,'Tài chính','Tác giả 14','/images/sachMD.jpg'),(15,'Sách 15',3,'Thiếu nhi','Tác giả 15','/images/sachMD.jpg'),(16,'Sách 16',6,'Y học','Tác giả 16','/images/sachMD.jpg'),(17,'Sách 17',14,'Nông nghiệp','Tác giả 17','/images/sachMD.jpg'),(18,'Sách 18',1,'Công nghệ','Tác giả 18','/images/sachMD.jpg'),(19,'Sách 19',9,'Khoa học','Tác giả 19','/images/sachMD.jpg'),(20,'Sách 20',10,'Lịch sử','Tác giả 20','/images/sachMD.jpg'),(21,'Sách 21',4,'Truyện tranh','Tác giả 21','/images/sachMD.jpg'),(22,'Sách 22',8,'Học đường','Tác giả 22','/images/sachMD.jpg'),(23,'Sách 23',6,'Du lịch','Tác giả 23','/images/sachMD.jpg'),(24,'Sách 24',7,'Thể thao','Tác giả 24','/images/sachMD.jpg'),(25,'Sách 25',2,'Chính trị','Tác giả 25','/images/sachMD.jpg'),(26,'Sách 26',3,'Kỹ thuật','Tác giả 26','/images/sachMD.jpg'),(27,'Sách 27',12,'Công nghệ','Tác giả 27','/images/sachMD.jpg'),(28,'Sách 28',9,'Vật lý','Tác giả 28','/images/sachMD.jpg'),(29,'Sách 29',11,'Thiết kế','Tác giả 29','/images/sachMD.jpg'),(30,'Sách 30',5,'Điện tử','Tác giả 30','/images/sachMD.jpg');
/*!40000 ALTER TABLE `sach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sach_seq`
--

DROP TABLE IF EXISTS `sach_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sach_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sach_seq`
--

LOCK TABLES `sach_seq` WRITE;
/*!40000 ALTER TABLE `sach_seq` DISABLE KEYS */;
INSERT INTO `sach_seq` VALUES (1);
/*!40000 ALTER TABLE `sach_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb`
--

DROP TABLE IF EXISTS `tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb` (
  `id` int NOT NULL,
  `header` varchar(255) DEFAULT NULL,
  `nd` varchar(255) DEFAULT NULL,
  `time` datetime(6) DEFAULT NULL,
  `id_nguoi` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5mu7rs28cmpcvrf0fhkop5keh` (`id_nguoi`),
  CONSTRAINT `FK5mu7rs28cmpcvrf0fhkop5keh` FOREIGN KEY (`id_nguoi`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb`
--

LOCK TABLES `tb` WRITE;
/*!40000 ALTER TABLE `tb` DISABLE KEYS */;
INSERT INTO `tb` VALUES (1,'Đơn xin mượn sách của bạn đã được chấp nhận','Chúc mừng đơn xin mượn sách Sách 2 đã được chấp nhận','2025-04-23 13:09:34.883311',8),(2,'Gửi User8','Không có gì hết!','2025-04-23 13:10:46.092091',8),(3,'Đơn xin trả sách của bạn đã được chấp nhận','Chúc mừng đơn xin trả sách Sách 2 đã được chấp nhận','2025-04-23 13:11:44.804626',8);
/*!40000 ALTER TABLE `tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_seq`
--

DROP TABLE IF EXISTS `tb_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_seq`
--

LOCK TABLES `tb_seq` WRITE;
/*!40000 ALTER TABLE `tb_seq` DISABLE KEYS */;
INSERT INTO `tb_seq` VALUES (101);
/*!40000 ALTER TABLE `tb_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sdt` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avt` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sdt_UNIQUE` (`sdt`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'0123456781','User1','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','admin'),(2,'0123456782','User2','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','thu_thu'),(3,'0123456783','User3','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','thu_thu'),(4,'0123456784','User4','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','thu_thu'),(5,'0123456785','User5','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(6,'0123456786','User6','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(7,'0123456787','User7','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(8,'0123456788','User8','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(9,'0123456789','User9','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(10,'0123456790','User10','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(11,'0123456791','User11','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(12,'0123456792','User12','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(13,'0123456793','User13','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(14,'0123456794','User14','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(15,'0123456795','User15','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(16,'0123456796','User16','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(17,'0123456797','User17','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(18,'0123456798','User18','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(19,'0123456799','User19','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien'),(20,'0123456800','User20','$2y$10$KTvWZZMqk9U7UG.FF9mY0OL1sDXu32ZNbOVbBZhEJ0xbCf4MwYZRW','/images/avtMD.png','sinh_vien');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (1);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_yc`
--

DROP TABLE IF EXISTS `user_yc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_yc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nguoi` int NOT NULL,
  `id_yc` int NOT NULL,
  `loai` varchar(255) DEFAULT NULL,
  `trang_thai` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt3v99lq28uhhk23n8epo0fyhg` (`id_nguoi`),
  KEY `FK70hy4t8onrwdfi4vovm2rjw6s` (`id_yc`),
  CONSTRAINT `FK70hy4t8onrwdfi4vovm2rjw6s` FOREIGN KEY (`id_yc`) REFERENCES `yeu_cau` (`id`),
  CONSTRAINT `FKt3v99lq28uhhk23n8epo0fyhg` FOREIGN KEY (`id_nguoi`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_yc`
--

LOCK TABLES `user_yc` WRITE;
/*!40000 ALTER TABLE `user_yc` DISABLE KEYS */;
INSERT INTO `user_yc` VALUES (1,8,1,'xin_lam_thu_thu','moi_xin'),(2,8,2,'muon_sach','dong_y'),(3,8,3,'tra_sach','dong_y');
/*!40000 ALTER TABLE `user_yc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_yc_seq`
--

DROP TABLE IF EXISTS `user_yc_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_yc_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_yc_seq`
--

LOCK TABLES `user_yc_seq` WRITE;
/*!40000 ALTER TABLE `user_yc_seq` DISABLE KEYS */;
INSERT INTO `user_yc_seq` VALUES (101);
/*!40000 ALTER TABLE `user_yc_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yeu_cau`
--

DROP TABLE IF EXISTS `yeu_cau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yeu_cau` (
  `id` int NOT NULL,
  `time` datetime(6) DEFAULT NULL,
  `nd` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yeu_cau`
--

LOCK TABLES `yeu_cau` WRITE;
/*!40000 ALTER TABLE `yeu_cau` DISABLE KEYS */;
INSERT INTO `yeu_cau` VALUES (1,'2025-04-23 13:08:55.949960','do t muốn thử làm'),(2,'2025-04-23 13:09:27.601105','2'),(3,'2025-04-23 13:11:34.192820','2');
/*!40000 ALTER TABLE `yeu_cau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yeu_cau_seq`
--

DROP TABLE IF EXISTS `yeu_cau_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yeu_cau_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yeu_cau_seq`
--

LOCK TABLES `yeu_cau_seq` WRITE;
/*!40000 ALTER TABLE `yeu_cau_seq` DISABLE KEYS */;
INSERT INTO `yeu_cau_seq` VALUES (101);
/*!40000 ALTER TABLE `yeu_cau_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-27 17:52:23
