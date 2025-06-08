
# Boston Crime Dashboard – 2017

This React-based dashboard visualizes crime data that occurred in Boston during 2017. The project presents interactive insights using charts and summaries to help users understand trends and patterns in the city's crime statistics.

## 🚀 Features

- 📊 **Pie Chart**: Displays proportional breakdowns of crime types.
- 📈 **Bar Chart**: Shows occurrences over time or categories.
- 🧾 **Summary Window**: Highlights key statistics for quick insights.
- 📂 **CSV Parsing**: Reads and processes raw data from `boston_crime_2017.csv`.
- 🧠 **Custom Hooks**: Simplifies logic with `useCrimeData` and `useFilters`.

### ✅ Bonus Ideas (if time allows)
- 🗺️ Map integration to pin crime locations by coordinates.
- 🧭 Navigation bar with routing (Home, About, Help).
- ❓ Cute and styled 404 error page.
- 👣 Footer with additional project information and legal text.

## 📁 Folder Structure

```
/public
/src
  /components
    /PieChart
      PieChart.tsx
      PieChart.module.css
    /BarChart
      BarChart.tsx
      BarChart.module.css
    /SummaryWindow
      SummaryWindow.tsx
      SummaryWindow.module.css
  /assets
  /utils
    csvParse.ts
    calculateStats.ts
  /data
    boston_crime_2017.csv
  /types
    index.ts
  /styles
    index.css
  /hooks
    useCrimeData.ts
    useFilters.ts
App.tsx
main.tsx
```

## 🛠️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/boston-crime-dashboard.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open in browser:

   ```
   http://localhost:5173
   ```

## 📦 Built With

- React + TypeScript
- Vite
- CSS Modules
- Recharts (depending on chart implementation)
- Custom hooks and utility functions

## 📊 Data Source

The dataset `boston_crime_2017.csv` includes anonymized records of crime reports filed in Boston throughout 2017.

## 📄 License

This project is for educational/demo purposes only. All rights reserved.
