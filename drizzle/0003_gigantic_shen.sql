CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`summary` text NOT NULL,
	`category` enum('furniture','lumber','architectural_stock','repair','firewood','chips_biomass','other') NOT NULL,
	`status` enum('available','coming_soon','reserved','sold','unverified') NOT NULL DEFAULT 'unverified',
	`materialLabel` varchar(180),
	`originProjectId` int,
	`imageUrl` varchar(1024),
	`availabilityNote` varchar(600),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `inquiries` ADD `businessCategory` enum('equipment_vendor','contractor','arborist_or_forestry','material_supplier','trucking_or_hauling','repair_or_fabrication','professional_services','other');--> statement-breakpoint
ALTER TABLE `inquiries` ADD `serviceArea` varchar(180);