---
layout: default
lang: en
title: Babalar Press - Publications
---

<div class="pub-filters">
  <button class="filter-btn active" data-filter="all">{{ site.data.translations[page.lang].filter_all }}</button>
  <button class="filter-btn" data-filter="current">{{ site.data.translations[page.lang].filter_current }}</button>
  <button class="filter-btn" data-filter="upcoming">{{ site.data.translations[page.lang].filter_upcoming }}</button>
  <button class="filter-btn" data-filter="past">{{ site.data.translations[page.lang].filter_past }}</button>
</div>

<div class="publications-grid" id="pub-grid">
  {% assign pubs = site.publications | where: "lang", page.lang %}
  {% for pub in pubs %}
        <a href="{{ pub.url }}" class="publication-card" data-status="{{ pub.status }}">
        <div class="pub-thumb">
            <img src="{{ pub.images[0].src | relative_url }}" alt="{{ pub.images[0].alt | default: pub.title }}">
            <div class="pub-hover-title">
            <span>{{ pub.title }}</span>
            </div>
        </div>
        <span class="status-badge status-{{ pub.status }}">
            {% case pub.status %}
                {% when "current" %}{{ site.data.translations[page.lang].filter_current }}
                {% when "upcoming" %}{{ site.data.translations[page.lang].filter_upcoming }}
                {% when "past" %}{{ site.data.translations[page.lang].filter_past }}
            {% endcase %}
            </span>
        </a>
  {% endfor %}
</div>
