export function humanizeBusinessDetail(value: string) {
  return value.replaceAll("_", " ");
}

export function businessPartnerDetailTokens(equipmentType?: string | null, contractorSpecialty?: string | null) {
  return [
    equipmentType ? `Equipment: ${humanizeBusinessDetail(equipmentType)}` : null,
    contractorSpecialty ? `Specialty: ${humanizeBusinessDetail(contractorSpecialty)}` : null,
  ].filter((item): item is string => Boolean(item));
}
