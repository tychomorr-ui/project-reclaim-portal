CREATE TABLE `impact_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metricKey` enum('participants','acres_restored','local_business_partnerships') NOT NULL,
	`value` decimal(14,2),
	`unit` varchar(80) NOT NULL,
	`verificationStatus` enum('pending','verified','superseded') NOT NULL DEFAULT 'pending',
	`sourceTitle` varchar(240),
	`sourceUrl` varchar(1024),
	`methodologyNote` text,
	`dataAsOf` timestamp,
	`verifiedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `impact_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(220) NOT NULL,
	`excerpt` text NOT NULL,
	`category` enum('work_pathway','training','stewardship','community_contribution','other') NOT NULL DEFAULT 'other',
	`attribution` varchar(180),
	`consentStatus` enum('pending','approved','withdrawn') NOT NULL DEFAULT 'pending',
	`publicationStatus` enum('draft','published','retired') NOT NULL DEFAULT 'draft',
	`consentReviewedAt` timestamp,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stories_id` PRIMARY KEY(`id`)
);
