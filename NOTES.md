# MT Legislation vis

Intent: To create a tool to visualize legislative votes

Form: Web app hosted on github pages or in-house server
Modeled after Quartz's chartbuilder
Code: https://github.com/Quartz/Chartbuilder
Display: http://quartz.github.io/Chartbuilder/

Input:
- Static data on legislative districts
- Vote data copied manually from mt.leg vote pages

OUTPUT:
- Responsive HTML that can be dropped into a BLOX HTML asset
- AND/OR
- Static version for sharing on social media


Graphic components:
- Graphic headline
- Secondary text
- Vote type
- Total number of Ayes/Nays --> Pass/fail
- Party lines indicator (DEM Ayes/Nays, GOP Ayes/Nays)
- Graphic display of votes - Simple table or cartogram

Progress so far:
- Node.js scripts for transforming some data
- Getting myself confused trying to set up a simple webpack dev environemnt

Workplan:
- Fork Chartbuilder, figure out how to create a custom chart type --> in chartbuilder-mt-leg repo
- Build a d3 template for a legislative chart --> in this repo
