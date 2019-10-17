/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost
 Source Database       : demo_weekly

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : utf-8

 Date: 10/17/2019 23:15:02 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(30) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '管理员名称',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '管理员密码',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '管理员邮箱',
  `type` int(10) NOT NULL DEFAULT '2',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `state` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1195997183@qq.com', '1', '2018-06-27 15:54:44', '2018-06-27 15:54:44', '1'), ('2', 'test1', 'e10adc3949ba59abbe56e057f20f883e', null, '2', '2019-09-24 22:42:05', '2019-09-24 22:42:11', '1'), ('3', 'test2', 'e10adc3949ba59abbe56e057f20f883e', null, '2', '2019-09-24 22:42:41', '2019-09-24 22:42:43', '1');
COMMIT;

-- ----------------------------
--  Table structure for `weekly`
-- ----------------------------
DROP TABLE IF EXISTS `weekly`;
CREATE TABLE `weekly` (
  `id` int(30) NOT NULL AUTO_INCREMENT COMMENT '周报id',
  `userId` int(30) NOT NULL COMMENT '创建者id',
  `startTime` date NOT NULL COMMENT '这周开始时间',
  `endTime` date NOT NULL COMMENT '这周结束时间',
  `title` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '今年的第几周',
  `thisWeekWork` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '这周完成工作',
  `nextWeekWork` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '下周工作计划',
  `collaboration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '需协调与帮助',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `state` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='周报表';

-- ----------------------------
--  Records of `weekly`
-- ----------------------------
BEGIN;
INSERT INTO `weekly` VALUES ('12', '1', '2018-06-25', '2018-06-29', '2018第26周', '<p>111</p>', '<p>222</p>', '333', '2018-06-29 15:43:17', '2018-06-29 15:43:17', '1'), ('13', '1', '2018-06-25', '2018-06-29', '2018第26周', '<p>111</p>', '<p>222</p>', '333', '2018-06-29 15:44:30', '2018-06-29 15:44:30', '1'), ('14', '1', '2018-06-25', '2018-06-29', '2018第26周', '<ol><li>分销活动逻辑制作未收到回复速度ukfh；</li><li>从App分享到小程序；</li><li>代码优化。</li></ol>', '<ol><li>分销活动剩余接口对接；</li><li>其他待定。</li></ol>', '王金科，王立志', '2018-06-29 15:54:44', '2018-07-05 19:01:05', '1'), ('15', '1', '2018-06-25', '2018-06-29', '2018第26周', '<p>申达股份三个地方</p>', '<p>水电费第三方</p>', '无色无', '2018-06-29 18:34:16', '2018-06-29 18:34:16', '1'), ('16', '1', '2018-06-18', '2018-06-22', '2018第25周', '<p>申达股份三个地方谁看见对方的时刻发挥</p>', '<p>水电费第三方</p>', '无色无', '2018-07-05 18:08:27', '2018-07-05 18:08:27', '1'), ('17', '1', '2018-07-02', '2018-07-06', '2018 第 27 周', '<p>多少苦海吃饭速度和顺丰到付</p>', '<p>大范甘迪速回复打算</p>', '法规回复等级', '2018-07-05 18:16:48', '2018-07-05 18:38:28', '1'), ('18', '1', '2018-07-02', '2018-07-06', '2018 第 27 周', '<p>而发热污染负荷</p>', '<p>儿童和侮辱和他二位</p>', '我看见发给人家', '2018-07-05 19:01:43', '2018-07-30 19:13:45', '1'), ('19', '1', '2018-07-30', '2018-08-03', '2018 第 31 周', '<p>打暑假工福建省的股份</p>', '<p>胜多负少肯定会复合大师</p>', '无', '2018-07-30 19:18:36', '2018-07-30 19:18:36', '1'), ('20', '1', '2018-07-24', '2018-07-27', '2018 第 30 周', '<p>但是结果发生金盾股份</p>', '<p>法国恢复供货给修好几天</p>', '无', '2018-07-31 18:10:17', '2018-07-31 18:10:17', '1'), ('21', '1', '2019-09-24', '2019-09-29', '2018 第 31 周', '<p>222</p>', '<p>333</p>', '无', '2019-09-24 23:53:31', '2019-10-15 23:01:39', '0'), ('22', '2', '2019-09-29', '2019-10-05', '2019 第 40 周', '<p>111</p>', '<p>222</p>', null, '2019-10-16 23:18:05', '2019-10-16 23:18:05', '1'), ('23', '2', '2019-10-06', '2019-10-12', '2019 第 41 周', '<p>222</p>', '<p>333</p>', null, '2019-10-16 23:18:21', '2019-10-16 23:18:21', '1'), ('24', '3', '2019-09-01', '2019-09-07', '2019 第 36 周', '<p>333</p>', '<p>444</p>', null, '2019-10-16 23:19:09', '2019-10-16 23:19:09', '1'), ('25', '3', '2019-09-08', '2019-09-14', '2019 第 37 周', '<p>444</p>', '<p>555</p>', null, '2019-10-16 23:19:24', '2019-10-16 23:19:24', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
