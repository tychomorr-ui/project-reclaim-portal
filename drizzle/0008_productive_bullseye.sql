CREATE TABLE `credential_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`participantLabel` varchar(180) NOT NULL,
	`pathway` enum('field_stewardship','fire_resilience','wood_carpentry','life_workplace','disaster_readiness','equipment_logistics','community_operations') NOT NULL,
	`credentialName` varchar(240) NOT NULL,
	`issuerName` varchar(240),
	`issuerStatus` enum('not_selected','partner_candidate','approved_issuer','verification_pending') NOT NULL DEFAULT 'not_selected',
	`recordStatus` enum('planned','enrolled','in_progress','completed','verified','withdrawn') NOT NULL DEFAULT 'planned',
	`evidenceNote` text,
	`completedAt` timestamp,
	`verifiedAt` timestamp,
	`reviewedBy` varchar(180),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `credential_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pilot_command_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(240) NOT NULL,
	`workstream` enum('property','residential','workforce','safety','partner','procurement','evidence','communications') NOT NULL,
	`status` enum('backlog','ready','in_progress','blocked','review','complete') NOT NULL DEFAULT 'backlog',
	`ownerLabel` varchar(180),
	`dueAt` timestamp,
	`dependencyNote` text,
	`releaseGate` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pilot_command_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_evaluations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyName` varchar(240) NOT NULL,
	`county` enum('mendocino','lake','other') NOT NULL,
	`propertyType` enum('vineyard_or_ranch','motel_or_hotel','farmhouse_or_lodge','commercial_hub','other') NOT NULL,
	`sourceUrl` varchar(1024),
	`listingStatus` enum('active_lead','not_listed','status_unknown','retired_lead') NOT NULL DEFAULT 'status_unknown',
	`planningRole` enum('residential_campus','operations_hub','two_site_candidate','future_branch') NOT NULL,
	`diligenceStatus` enum('lead','broker_contact_pending','broker_verified','title_pending','code_pending','safety_pending','board_review','approved_for_due_diligence','rejected','archived') NOT NULL DEFAULT 'lead',
	`brokerStatus` enum('not_started','requested','received','verified','blocked') NOT NULL DEFAULT 'not_started',
	`titleStatus` enum('not_started','ordered','received','reviewed','blocked') NOT NULL DEFAULT 'not_started',
	`codeStatus` enum('not_started','requested','received','reviewed','blocked') NOT NULL DEFAULT 'not_started',
	`safetyStatus` enum('not_started','screening','professional_review','cleared_for_next_step','blocked') NOT NULL DEFAULT 'not_started',
	`sourceAsOf` timestamp,
	`blockerNote` text,
	`nextAction` varchar(600),
	`reviewedBy` varchar(180),
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `property_evaluations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resident_intakes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationCode` varchar(40) NOT NULL,
	`applicantName` varchar(180) NOT NULL,
	`contactEmail` varchar(320),
	`contactPhone` varchar(40),
	`entryPathway` enum('walk_in','veteran_referral','housing_referral','workforce_referral','reentry_referral','court_or_supervision_referral','other') NOT NULL,
	`requestedTrack` enum('residential','community_based','field_school','not_sure') NOT NULL,
	`intakeStatus` enum('received','screening','eligible_review','placement_pending','placed','waitlist','declined','withdrawn') NOT NULL DEFAULT 'received',
	`consentToContact` boolean NOT NULL DEFAULT false,
	`accessibilityNote` varchar(600),
	`supportPathwayStatus` enum('not_assessed','referral_needed','provider_pathway_identified','provider_connected') NOT NULL DEFAULT 'not_assessed',
	`courtAuthorityStatus` enum('not_applicable','referral_pending','authority_pending','authorized','not_authorized') NOT NULL DEFAULT 'not_applicable',
	`placementNote` text,
	`privateReviewNote` text,
	`reviewedBy` varchar(180),
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resident_intakes_id` PRIMARY KEY(`id`),
	CONSTRAINT `resident_intakes_applicationCode_unique` UNIQUE(`applicationCode`)
);
