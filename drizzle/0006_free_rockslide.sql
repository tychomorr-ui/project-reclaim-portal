CREATE TABLE `field_evidence_pilots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(220) NOT NULL,
	`overview` text NOT NULL,
	`generalArea` varchar(220),
	`authorizationReference` varchar(240),
	`authorizationStatus` enum('draft','authorization_pending','authorized_private_tracking','authorized_public_summary','completed') NOT NULL DEFAULT 'draft',
	`workOrderStatus` enum('not_started','planned','in_progress','complete','on_hold') NOT NULL DEFAULT 'not_started',
	`crewLabel` varchar(180),
	`materialPathway` varchar(240),
	`evidenceSummary` text,
	`evidenceUrl` varchar(1024),
	`reviewStatus` enum('not_reviewed','pending_review','verified','needs_revision') NOT NULL DEFAULT 'not_reviewed',
	`publicReleaseStatus` enum('not_approved','approved','retired') NOT NULL DEFAULT 'not_approved',
	`publicSummary` text,
	`authorizedAt` timestamp,
	`reviewedAt` timestamp,
	`publicReleasedAt` timestamp,
	`reviewedBy` varchar(180),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `field_evidence_pilots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referral_resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organizationName` varchar(220) NOT NULL,
	`serviceType` enum('behavioral_health','substance_use','life_skills','care_navigation','housing_reentry','workforce_training','emergency_support','other') NOT NULL,
	`publicSummary` text NOT NULL,
	`serviceArea` varchar(200),
	`publicUrl` varchar(1024),
	`publicPhone` varchar(40),
	`directoryStatus` enum('draft','verification_pending','verified','needs_recheck','retired') NOT NULL DEFAULT 'draft',
	`lastVerifiedAt` timestamp,
	`nextReviewAt` timestamp,
	`reviewedBy` varchar(180),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referral_resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `impact_metrics` ADD `reviewedBy` varchar(180);--> statement-breakpoint
ALTER TABLE `stories` ADD `reviewedBy` varchar(180);