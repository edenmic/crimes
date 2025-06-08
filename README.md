the assignment is to display a dashbpard with information about crimes that were taken during 2017 in Boston.

files:

-public
-src/
  -components/
    -PieChart/
        PieChart.tsx
        PieChart.module.css
    -BarChart/
      BarChart.tsx
      BarChart.module.css
    -SummaryWindow/
      SummaryWindow.tsx
      SummaryWindow.module.css
    -Features (if time left)
      ## It will be awesome if Ill find a map and pin all the coordinates according to filter, will need to use async/await and handle loading, maybe lazy loading
      ##error 404 cute page
      ##navbar? will import Route and create home (main dashboard), about, help
      ##footer (information about the web, all rights reserved etc..)
  -assets
  -utils/
    csvParse.ts
    calculateStats.ts
  -data/
    boston_crime_2017.csv
  -types/
    index.ts
  -styles/
    index.css
  -hooks/
    useCrimeDate.ts
    useFilters.ts

App.tsx
main.tsx

