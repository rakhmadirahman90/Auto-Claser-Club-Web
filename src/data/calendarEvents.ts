export type CalendarEvent = {
  date: number; // 1-31
  month: number; // 0-11
  type: 'agenda' | 'birthday' | 'holiday';
  title: string;
};

export const calendarEvents: CalendarEvent[] = [
  // Club Events
  { date: 15, month: 0, type: 'agenda', title: 'Pertemuan Rutin' },
  { date: 20, month: 1, type: 'birthday', title: 'Budi Santoso' },
  { date: 5, month: 2, type: 'agenda', title: 'Touring ACC' },
  { date: 10, month: 3, type: 'birthday', title: 'Andi Wijaya' },
  { date: 25, month: 4, type: 'agenda', title: 'Bakti Sosial' },
  { date: 15, month: 5, type: 'birthday', title: 'Citra Dewi' },
  { date: 2, month: 6, type: 'agenda', title: 'Halal Bihalal' },
  { date: 18, month: 7, type: 'birthday', title: 'Dedi Kurniawan' },
  { date: 12, month: 8, type: 'agenda', title: 'Ulang Tahun Klub' },
  { date: 22, month: 9, type: 'birthday', title: 'Eka Saputra' },
  { date: 5, month: 10, type: 'agenda', title: 'Camping Ceria' },
  { date: 30, month: 11, type: 'birthday', title: 'Fitriani' },

  // 2026 National Holidays (Representative)
  { date: 1, month: 0, type: 'holiday', title: 'Tahun Baru 2026' },
  { date: 17, month: 1, type: 'holiday', title: 'Isra Mi\'raj' },
  { date: 19, month: 2, type: 'holiday', title: 'Nyepi' },
  { date: 31, month: 2, type: 'holiday', title: 'Idul Fitri' },
  { date: 1, month: 3, type: 'holiday', title: 'Idul Fitri' },
  { date: 1, month: 4, type: 'holiday', title: 'Hari Buruh' },
  { date: 14, month: 4, type: 'holiday', title: 'Kenaikan Yesus Kristus' },
  { date: 1, month: 5, type: 'holiday', title: 'Hari Pancasila' },
  { date: 25, month: 5, type: 'holiday', title: 'Idul Adha' },
  { date: 16, month: 6, type: 'holiday', title: 'Tahun Baru Islam' },
  { date: 17, month: 7, type: 'holiday', title: 'Hari Kemerdekaan' },
  { date: 27, month: 8, type: 'holiday', title: 'Maulid Nabi Muhammad SAW' },
  { date: 25, month: 11, type: 'holiday', title: 'Hari Natal' },
];
