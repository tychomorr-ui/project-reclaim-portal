CREATE TABLE `evidence_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fieldPilotId` int,
	`title` varchar(220) NOT NULL,
	`publicSummary` text,
	`evidenceType` enum('photo','before_after','document','work_record','site_authority','other') NOT NULL DEFAULT 'other',
	`contentType` varchar(160) NOT NULL,
	`storageKey` varchar(1024) NOT NULL,
	`storageUrl` varchar(1024) NOT NULL,
	`visibility` enum('private','public_approved') NOT NULL DEFAULT 'private',
	`capturedAt` timestamp,
	`reviewedAt` timestamp,
	`reviewedBy` varchar(180),
	`publicReleasedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `evidence_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provenance_packets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fieldPilotId` int,
	`title` varchar(220) NOT NULL,
	`publicSummary` text NOT NULL,
	`contentDigest` varchar(160) NOT NULL,
	`digestAlgorithm` varchar(60) NOT NULL DEFAULT 'SHA-256',
	`status` enum('prepared','integration_review','verified_external','retired') NOT NULL DEFAULT 'prepared',
	`externalReference` varchar(1024),
	`reviewedAt` timestamp,
	`reviewedBy` varchar(180),
	`publicReleaseStatus` enum('not_approved','approved','retired') NOT NULL DEFAULT 'not_approved',
	`publicReleasedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `provenance_packets_id` PRIMARY KEY(`id`)
);
