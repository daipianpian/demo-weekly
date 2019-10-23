-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-10-23 14:31:40
-- 服务器版本： 5.6.36-log
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo_weekly`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(30) NOT NULL COMMENT '用户id',
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名称',
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户密码',
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户邮箱',
  `type` int(10) NOT NULL DEFAULT '2' COMMENT '用户类型',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `state` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `email`, `type`, `create_time`, `update_time`, `state`) VALUES
(1, 'admin', 'de06091877ea209cff3c4b4a28194c8e', '1195997183@qq.com', 1, '2018-06-27 09:54:44', '2018-06-27 15:54:44', '1'),
(2, 'test1', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-09-24 08:00:00', '2019-10-14 16:59:07', '1'),
(3, 'test2', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-09-24 09:00:00', '2019-10-15 14:22:02', '2'),
(4, 'test3', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2018-10-09 09:54:44', '2019-10-10 09:10:20', '1'),
(5, 'test4', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-10 09:12:18', '2019-10-14 16:58:42', '1'),
(16, 'test5', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-12 15:54:30', '2019-10-12 15:54:30', '1'),
(24, 'test6', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-12 16:01:13', '2019-10-12 16:01:13', '1'),
(25, 'test7', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-12 16:01:20', '2019-10-12 16:01:20', '1'),
(32, 'test8', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-12 16:09:30', '2019-10-12 16:09:30', '1'),
(33, 'test9', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-14 10:09:56', '2019-10-14 10:09:56', '1'),
(35, 'test10', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-14 10:11:11', '2019-10-15 14:25:03', '0'),
(36, 'test12', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-15 15:16:36', '2019-10-15 15:46:24', '1'),
(37, 'test14', 'e10adc3949ba59abbe56e057f20f883e', NULL, 2, '2019-10-15 15:17:39', '2019-10-15 15:37:21', '1');

-- --------------------------------------------------------

--
-- 表的结构 `weekly`
--

CREATE TABLE `weekly` (
  `id` int(30) NOT NULL COMMENT '周报id',
  `userId` int(30) NOT NULL COMMENT '创建者id',
  `startTime` date NOT NULL COMMENT '这周开始时间',
  `endTime` date NOT NULL COMMENT '这周结束时间',
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '今年的第几周',
  `thisWeekWork` text COLLATE utf8_unicode_ci NOT NULL COMMENT '这周完成工作',
  `nextWeekWork` text COLLATE utf8_unicode_ci COMMENT '下周工作计划',
  `collaboration` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '需协调与帮助',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `state` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='周报表';

--
-- 转存表中的数据 `weekly`
--

INSERT INTO `weekly` (`id`, `userId`, `startTime`, `endTime`, `title`, `thisWeekWork`, `nextWeekWork`, `collaboration`, `create_time`, `update_time`, `state`) VALUES
(12, 1, '2018-06-25', '2018-06-29', '2018第26周', '<p>111</p>', '<p>222</p>', '333', '2018-06-29 15:43:17', '2018-06-29 15:43:17', '0'),
(13, 1, '2019-07-14', '2019-07-20', '2019 第 29 周', '<p>111</p>', '<p>333</p>', '333', '2018-06-29 15:44:30', '2019-10-18 16:56:37', '1'),
(14, 1, '2019-07-21', '2019-07-27', '2019 第 30 周', '<ol><li>分销活动逻辑制作未收到回复速度ukfh；</li><li>从App分享到小程序；</li><li>代码优化。</li></ol>', '<ol><li>分销活动剩余接口对接；</li><li>其他待定。</li></ol>', '王金科，王立志', '2018-06-29 15:54:44', '2019-10-18 16:56:17', '1'),
(15, 1, '2019-07-28', '2019-08-03', '2019 第 31 周', '<p>申达股份三个地方</p>', '<p>水电费第三方</p>', '无色无', '2018-06-29 18:34:16', '2019-10-18 16:55:52', '1'),
(16, 1, '2019-08-04', '2019-08-10', '2019 第 32 周', '<p>申达股份三个地方谁看见对方的时刻发挥</p>', '<p>水电费第三方</p>', '无色无', '2018-07-05 18:08:27', '2019-10-18 16:20:23', '1'),
(17, 1, '2019-08-11', '2019-08-17', '2019 第 33 周', '<p>多少苦海吃饭速度和顺丰到付</p>', '<p>大范甘迪速回复打算</p>', '法规回复等级', '2018-07-05 18:16:48', '2019-10-18 16:20:05', '1'),
(18, 2, '2019-08-18', '2019-08-24', '2019 第 34 周', '<p>而发热污染负荷</p>', '<p>儿童和侮辱和他二位</p>', '我看见发给人家', '2018-07-05 19:01:43', '2019-10-18 16:19:51', '1'),
(19, 1, '2019-08-25', '2019-08-31', '2019 第 35 周', '<p>打暑假工福建省的股份</p>', '<p>胜多负少肯定会复合大师</p>', '无', '2018-07-30 19:18:36', '2019-10-18 16:19:21', '1'),
(20, 2, '2019-09-01', '2019-09-07', '2019 第 36 周', '<p>但是结果发生金盾股份</p>', '<p>法国恢复供货给修好几天</p>', '无', '2018-07-31 18:10:17', '2019-10-18 16:19:00', '1'),
(21, 1, '2019-09-08', '2019-09-14', '2019 第 37 周', '<p>111</p>', '<p>222</p>', '333', '2019-10-14 15:13:32', '2019-10-18 16:18:40', '1'),
(22, 1, '2019-09-15', '2019-09-21', '2019 第 38 周', '<p>111</p>', '<p>222</p>', NULL, '2019-10-16 10:17:33', '2019-10-18 16:17:15', '1'),
(23, 1, '2019-09-22', '2019-09-28', '2019 第 39 周', '<p>11</p>', '<p>33</p>', NULL, '2019-10-16 10:29:02', '2019-10-18 16:16:58', '1'),
(24, 1, '2019-09-29', '2019-10-05', '2019 第 40 周', '<p>eee</p>', '<p>ggg</p>', NULL, '2019-10-16 12:08:10', '2019-10-18 16:16:44', '1'),
(25, 1, '2019-10-06', '2019-10-12', '2019 第 41 周', '<p>rrr</p>', '<p>ggg</p>', NULL, '2019-10-16 12:08:38', '2019-10-18 16:16:37', '1'),
(26, 1, '2019-10-13', '2019-10-19', '2019 第 42 周', '<p>逛逛</p>', '<p>看看</p>', NULL, '2019-10-16 12:09:16', '2019-10-18 16:16:25', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `weekly`
--
ALTER TABLE `weekly`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=38;
--
-- 使用表AUTO_INCREMENT `weekly`
--
ALTER TABLE `weekly`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT COMMENT '周报id', AUTO_INCREMENT=27;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
