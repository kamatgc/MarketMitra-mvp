// NSE/BSE holidays for 2025 (YYYY-MM-DD format, IST dates)
const MARKET_HOLIDAYS_2025: string[] = [
    '2025-01-26', // Republic Day
    '2025-03-14', // Holi
    '2025-04-14', // Dr. Ambedkar Jayanti
    '2025-04-18', // Good Friday
    '2025-05-01', // Maharashtra Day
    '2025-08-15', // Independence Day
    '2025-10-02', // Gandhi Jayanti
    '2025-10-21', // Diwali (Laxmi Pujan)
    '2025-11-04', // Guru Nanak Jayanti
    '2025-12-25'  // Christmas
  ]
  
  // Helper: returns current IST Date object
  function nowIST(): Date {
    const now = new Date()
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
    const istMs = utcMs + 5.5 * 3600 * 1000
    return new Date(istMs)
  }
  
  // Helper: format as YYYY-MM-DD in IST
  function formatISTDate(d: Date): string {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }
  
  export function isMarketOpen(): boolean {
    const ist = nowIST()
  
    const day = ist.getDay() // 0 Sun, 6 Sat
    if (day === 0 || day === 6) return false
  
    // Holiday check
    if (MARKET_HOLIDAYS_2025.includes(formatISTDate(ist))) return false
  
    // 9:15–15:30 IST
    const openMinutes = 9 * 60 + 15
    const closeMinutes = 15 * 60 + 30
    const currentMinutes = ist.getHours() * 60 + ist.getMinutes()
  
    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes
  }
  