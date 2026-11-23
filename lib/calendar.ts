import { invitation } from "@/data/invitation";

function formatICSDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeICSText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/**
 * Generates and downloads a valid .ics calendar file for Lubaiba & Raees's Nikkah.
 */
export function downloadNikkahICS(): void {
  const { couple, event, venue } = invitation;
  const start = formatICSDate(event.startDateISO);
  const end = formatICSDate(event.endDateISO);
  const now = formatICSDate(new Date().toISOString());

  const summary = `${couple.bride.firstName} & ${couple.groom.firstName} — ${event.title}`;
  const location = `${venue.name}, ${venue.addressLine1}, ${venue.addressLine2}`;
  const description = `${couple.tagline}\\n\\nWe warmly invite you to celebrate the Nikkah of ${couple.bride.firstName} and ${couple.groom.firstName}.\\n\\nDirections: ${venue.mapsUrl}`;

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lubaiba & Raees Nikkah//Digital Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:nikkah-lubaiba-raees-${event.year}@invitation`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICSText(summary)}`,
    `LOCATION:${escapeICSText(location)}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([icsLines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Lubaiba-and-Raees-Nikkah.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
