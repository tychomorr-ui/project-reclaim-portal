CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('contact','partnership') NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(320) NOT NULL,
	`organization` varchar(180),
	`phone` varchar(40),
	`focus` varchar(180),
	`message` text NOT NULL,
	`status` enum('new','reviewing','responded','archived') NOT NULL DEFAULT 'new',
	`emailNotificationSent` boolean NOT NULL DEFAULT false,
	`ownerNotificationSent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `opportunities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`summary` text NOT NULL,
	`type` enum('job','contract','training','internship','apprenticeship','volunteer') NOT NULL,
	`status` enum('open','coming_soon','filled','completed','unverified') NOT NULL DEFAULT 'unverified',
	`organization` varchar(180),
	`locationLabel` varchar(200),
	`applicationMethod` varchar(600),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opportunities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`slug` varchar(200) NOT NULL,
	`summary` text NOT NULL,
	`category` enum('fire_mitigation','wood_reclamation','workforce_development','land_restoration','community_infrastructure') NOT NULL,
	`status` enum('active','planned','completed','unverified') NOT NULL DEFAULT 'unverified',
	`verificationStatus` enum('verified','unverified') NOT NULL DEFAULT 'unverified',
	`locationLabel` varchar(200),
	`impactMetricLabel` varchar(160),
	`impactMetricValue` varchar(160),
	`evidenceUrl` varchar(1024),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
