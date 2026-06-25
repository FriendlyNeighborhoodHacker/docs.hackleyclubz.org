---
layout: ../../layouts/DocsLayout.astro
title: Technical Overview
description: The architecture of the Hackley Clubz platform.
order: 71
section: developer-docs
---

# Technical Overview

Hackley Clubz is currently a web application but will be released as an iOS application and Andriod Application as well.

The web aplication is built in PHP, hosted on Dreamhost (web server + database server). There is also a chat server on dreamhost written in python that pushes new messages to web browsers while they are in message threads.

The sourcecode is in gitHub [here](https://github.com/FriendlyNeighborhoodHacker/hackley-clubz).

It uses Google Identity Services for login.

The iOS and Android apps will be forthcoming as soon as the web application is finalized. They will use the PHP webserver as an api endpoint.

It is a very simple application.
