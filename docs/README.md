

## Background
The Recalls PWA is a port of CPSC's recalls widget app oiriginally developed to assist in reduting recalled product exposure through online secondary markets. The goal of the widget is to utilize the existing [Recalls Application Programming Interface (API)](https://www.cpsc.gov/Recalls/CPSC-Recalls-Application-Program-Interface-API-Information) functionality and develop an HTML widget that can easily be incorporated by resellers on their websites as an embeddable search tool without requiring alot of technical expertise from client websites.

## Converting The Widget to a PWA
There is one basic factor that made the recalls widget app PWA ready, cross platform and flexibe, it was already written in the only language that all browsers speak, `HTML`, `Javascript` and `CSS`. The mechanism that processes the widget's data and sends it back the results, is a .NET Web API that's entirely replacable without modifying the widget itself. 

The widget application is simple enough, it has the right architecture, it was using a mobile friendly web framework for layouts.

## What is a PWA
A PWA, progressive web app, is the idea of always start any new development project with a mobile first mindset.
A website is differtent from a web app, a website is mostly static contact where as a web app can be highly interactive. but a PWA is:

1.	Progressive - Work for every user, regardless of browser choice because they’re built with progressive enhancement as a core tenet.
2.	Responsive - Fit any form factor: desktop, mobile, tablet, or forms yet to emerge.
3.	Connectivity independent - Service workers allow work offline, or on low quality networks.
4.	App-like - Feel like an app to the user with app-style interactions and navigation.
5.	Fresh - Always up-to-date thanks to the service worker update process.
6.	Safe - Served via HTTPS to prevent snooping and ensure content hasn’t been tampered with. (already done)
7.	Discoverable - Are identifiable as “applications” thanks to W3C manifests[6] and service worker registration scope allowing search engines to find them.
8.	Re-engageable - Make re-engagement easy through features like push notifications.
9.	Installable - Allow users to “keep” apps they find most useful on their home screen without the hassle of an app store.
10.	Linkable - Easily shared via a URL and do not require complex installation.


## Search Overview
- The initial search box is key word search and will search in some pre-defined fields in the database. The returned results should be the same as the CPSC’s Recall product web search.

- Advanced search fields include Product Name, Manufacture, Product Type, Product Model, and Date Range. Among all these fields, Date Range is in lower priority.

- System returns initial results when users use key word search. Users can use other advanced search fields to narrow down.

- Manufacture, Product Type and Date Range are drop-down lists. The list of values for Manufacture and Product Type are dynamic. It will change accordingly based on the key word entered by users.

- Users need to fill at least one search field to enable search function.

## Architecture

## Environment

## Deployment