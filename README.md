# arcgis-version-playground

This repo was created to allow comparisons between different release versions of ArcGIS JavaScript, and currently contains versions 4.27 through 5.0. 

## Process
I grabbed the angular folder from Esri's [jsapi-resources repo](https://github.com/esri/jsapi-resources) at each release version. The only changes made to the original jsapi-resources code was to add portalUrl, itemId, and proxyUrl via a config, remove all widgets/map-components other than the map, and add the layer list. Each folder is it's own angular app, each version you intend to test will need to be installed and started. Each folder has it's own unique port so multiple can be run at the same time.

Before running, set your portalUrl, itemId, and proxyUrl (if needed), in the config.ts at the top of the project.

# Memory Usage Between Versions
I identified the following increases in memory usage across the different versions. The webmap used in testing below has 218 layers. I also tested with the webmap included in the 5.0 example and saw a 

## Summary
For the basic applications with just a map and layer list:
- Versions up through 4.28: 1,900 DOM, 640 JS Event Listeners
- Versions 4.29-4.31: 9,900 DOM, 5,100 JS Event Listeners
- Versions 4.32-5.0: 23,800-25,100 DOM, 4,800-5,100 JS Event Listeners

## Breakdown

- 4.27 - 376c2a7
    - Without: 70 DOM, 65 MB JS Heap Size, 144 JS Event Listeners
    - With 218 Layer List: 1,985 DOM, 70 MB JS Heap Size, 640 JS Event Listeners

- 4.28 - 6b7c0ef
    - Without: 69 DOM, 60 MB JS Heap Size, 145 JS Event Listeners
    - With 218 Layer List: 1,984 DOM, 64 MB JS Heap Size, 637 JS Event Listeners

- 4.29 - 265125c
    - Without: 82 DOM, 59 MB JS Heap Size, 145 JS Event Listeners
    - With 218 Layer List: 9,906 DOM, 67 MB JS Heap Size, 5,107 JS Event Listeners

- 4.30 - 9fe7d8c
    - Without: 80 DOM, 76 MB JS Heap Size, 141 JS Event Listeners
    - With 218 Layer List: 9,913 DOM, 72 MB JS Heap Size, 5,103 JS Event Listeners

- 4.31 - 9b28f9a
    - Without: 86 DOM, 67 MB JS Heap Size, 145 JS Event Listeners
    - With 218 Layer List: 9,957 DOM, 84 MB JS Heap Size, 5,126 JS Event Listeners

- 4.32 - c1873fe
    - Without: 85 DOM, 67 MB JS Heap Size, 136 JS Event Listeners
    - With 218 Layer List: 24,007 DOM, 88 MB JS Heap Size, 5,076 JS Event Listeners

- 4.33 - aa60c1f
    - Without: 69 DOM, 70 MB JS Heap Size, 142 JS Event Listeners
    - With 218 Layer List:  23,991 DOM, 88 MB JS Heap Size, 5,073 JS Event Listeners
    
- 4.34 - b474aa5
    - Without: 142 DOM, 72 MB JS Heap Size, 131 JS Event Listeners
    - With 218 Layer List: 25,162 DOM, 92 MB JS Heap Size, 5,074 JS Event Listeners

- 5.0 - 
    - Without: 146 DOM, 80 MB JS Heap Size, 145 JS Event Listeners
    - With 218 Layer List: 23,845 DOM, 99 MB JS Heap Size, 4,864 JS Event Listeners

# Calcite Memory Usage

When testing switching to Calcite, we saw a 2x increase in DOM node usage across our application, and in some cases (depending on the specific sub tool used), we saw that DOM node usage increase 7x. One example is the table component.

I added a custom map component in 5_0 which can be un-commented out to test an html table against a calcite table with the same 200 elements. It appears in the expand component in the top left of the map. The results below were completed in order, and memory collected between each step. Layer list was on during the test.

200 Table Rows
- Before: 25,050 DOM, 102 MB, 4,874 JS Event Listeners
- After clicking "Toggle HTML Table": 26,862 DOM, 102 MB, 4881 JS Event Listeners
- After clicking "Toggle HTML Table" again: 25,051 DOM, 102 MB, 4,880 JS Event Listeners
- After clicking "Toggle Calcite Table": 35,401 DOM, 109 MB, 8,499 JS Event Listeners
- After clicking "Toggle Calcite Table" again: 25,106 DOM, 101 MB, 4,881 JS Event Listeners

400 Table Rows
- Before: 25,050 DOM, 100 MB, 4,872 JS Event Listeners
- After clicking "Toggle HTML Table": 28,662 DOM, 101 MB, 4879 JS Event Listeners
- After clicking "Toggle HTML Table" again: 25,051 DOM, 101 MB, 4,878 JS Event Listeners
- After clicking "Toggle Calcite Table": 45,601 DOM, 118 MB, 12,098 JS Event Listeners
- After clicking "Toggle Calcite Table" again: 25,106 DOM, 101 MB, 4,879 JS Event Listeners

400 Table Rows with calcite pageSize of 100
- Before: 25,050 DOM, 101 MB, 4,862 JS Event Listeners
- After clicking "Toggle HTML Table": 28,717 DOM, 102 MB, 4871 JS Event Listeners
- After clicking "Toggle HTML Table" again: 25,106 DOM, 102 MB, 4,870 JS Event Listeners
- After clicking "Toggle Calcite Table": 45,601 DOM, 119 MB, 12,090 JS Event Listeners
- After clicking "Toggle Calcite Table" again: 25,106 DOM, 102 MB, 4,870 JS Event Listeners