/*
 Navicat Premium Data Transfer

 Source Server         : Database MySQL
 Source Server Type    : MySQL
 Source Server Version : 100315
 Source Host           : localhost:3306
 Source Schema         : db_chuii

 Target Server Type    : MySQL
 Target Server Version : 100315
 File Encoding         : 65001

 Date: 21/06/2019 21:15:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_category
-- ----------------------------
DROP TABLE IF EXISTS `tb_category`;
CREATE TABLE `tb_category`  (
  `id_category` int(12) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_category`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci;

-- ----------------------------
-- Records of tb_category
-- ----------------------------
BEGIN;
INSERT INTO `tb_category` VALUES (1, 'Belajar'), (2, 'Komik');
COMMIT;

-- ----------------------------
-- Table structure for tb_note
-- ----------------------------
DROP TABLE IF EXISTS `tb_note`;
CREATE TABLE `tb_note`  (
  `id_note` int(12) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `note` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `time_created` datetime(0) NOT NULL DEFAULT current_timestamp(0),
  `time_update` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  `id_category` int(12) NOT NULL COMMENT 'Foreign Key',
  PRIMARY KEY (`id_note`) USING BTREE,
  INDEX `id_category`(`id_category`) USING BTREE,
  CONSTRAINT `tb_note_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `tb_category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci;

-- ----------------------------
-- Records of tb_note
-- ----------------------------
BEGIN;
INSERT INTO `tb_note` VALUES (1, 'Belajar Bahasa Jepang', '2019-06-19 21:57:03', '2019-06-21 20:29:40', 1), (2, 'Belajar Pemrograman C++', '2019-06-20 11:22:09', '2019-06-21 20:29:40', 1), (3, 'Belajar Pemrograman PHP', '2019-06-20 11:43:54', '2019-06-21 20:29:40', 1), (4, 'Belajar Pemrograman JavaScript', '2019-06-20 11:44:05', '2019-06-21 20:29:40', 1), (5, 'Belajar Bahasa Inggris', '2019-06-20 11:44:18', '2019-06-21 20:29:40', 1), (6, 'Shigatsu wa Kimi no Uso', '2019-06-20 13:05:10', '2019-06-21 20:29:40', 2), (7, 'Zetsumei no Tempest', '2019-06-20 13:05:46', '2019-06-21 20:29:40', 2), (8, 'Naruto', '2019-06-20 13:06:15', '2019-06-21 20:29:40', 2), (9, 'Shingeki no Kyojin', '2019-06-20 14:21:13', '2019-06-21 20:29:40', 2), (10, 'Akame ga Kill', '2019-06-20 14:21:13', '2019-06-21 20:29:40', 2), (11, 'Belajar MySQL', '2019-06-20 21:18:10', '2019-06-21 20:29:40', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
