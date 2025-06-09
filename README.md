
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
ª   App.css
ª   App.tsx
ª   main.tsx
ª   
+---assets
ª       404.jpg
ª       react.svg
ª       
+---components
ª   +---BarChart
ª   ª       BarChart.module.css
ª   ª       BarChart.tsx
ª   ª       
ª   +---CrimeMap
ª   ª       CrimeMap.module.css
ª   ª       CrimeMap.tsx
ª   ª       
ª   +---Dashboard
ª   ª       Dashboard.module.css
ª   ª       Dashboard.tsx
ª   ª       Dashbosrd.module.css
ª   ª       
ª   +---DataTable
ª   ª       DataTable.module.css
ª   ª       DataTable.tsx
ª   ª       
ª   +---Filters
ª   ª       Filters.module.css
ª   ª       Filters.tsx
ª   ª       
ª   +---Footer
ª   ª       Footer.module.css
ª   ª       Footer.tsx
ª   ª       
ª   +---Header
ª   ª       Header.module.css
ª   ª       Header.tsx
ª   ª       
ª   +---HeatMap
ª   ª       HeatMap.module.css
ª   ª       HeatMap.tsx
ª   ª       
ª   +---LineChart
ª   ª       LineChart.module.css
ª   ª       LineChart.tsx
ª   ª       
ª   +---NavBar
ª   ª       NavBar.module.css
ª   ª       NavBar.tsx
ª   ª       
ª   +---PieChart
ª   ª       PieChart.module.css
ª   ª       PieChart.test.tsx
ª   ª       PieChart.tsx
ª   ª       
ª   +---Skeleton
ª   ª       Skeleton.module.css
ª   ª       Skeleton.tsx
ª   ª       
ª   +---SummaryWindow
ª   ª       SummaryWindow.module.css
ª   ª       SummaryWindow.tsx
ª   ª       
ª   +---ThemeToggle
ª           ThemeToggle.module.css
ª           ThemeToggle.tsx
ª           
+---contexts
ª       ThemeContext.tsx
ª       
+---data
ª       boston_crime_2017.csv
ª       
+---hooks
ª       useCrimeData.ts
ª       useDataLoader.ts
ª       useFilters.ts
ª       
+---pages
ª       AboutPage.module.css
ª       AboutPage.tsx
ª       DashboardPage.tsx
ª       HelpPage.module.css
ª       HelpPage.tsx
ª       NotFound.module.css
ª       NotFound.tsx
ª       
+---styles
ª       index.css
ª       variables.css
ª       
+---types
ª       index.ts
ª       
+---utils
ª       calculateStats.ts
ª       csvParse.ts
ª       dataOptimizer.ts
ª       exportData.ts
ª       filterCrimes.ts
ª       
+---workers
        csvWorker.ts
```

## 🛠️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/edenmic/crimes.git
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
