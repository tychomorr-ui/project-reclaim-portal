ALTER TABLE `inquiries` ADD `partnerCategory` enum('cal_fire','hud','terra','tribal_ecorestoration_alliance','county_or_local_government','tribal_government','contractor_or_forestry','equipment_or_material_partner','workforce_or_support_provider','other');--> statement-breakpoint
ALTER TABLE `inquiries` ADD `siteContext` varchar(240);--> statement-breakpoint
ALTER TABLE `projects` ADD `latitude` decimal(10,7);--> statement-breakpoint
ALTER TABLE `projects` ADD `longitude` decimal(10,7);