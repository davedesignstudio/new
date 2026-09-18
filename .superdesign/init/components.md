# Shared UI primitives

This repository is a Hugo + PostCSS site (Victor Hugo / restaurant template). There is no React/Vue component library. Shared UI lives in Hugo partials and CSS classes.

## SidebarNav
- File: `site/layouts/partials/sidebar.html`
- Description: Dark left rail with site title, lead, and main nav links.
- Key props: none (Hugo context `.Site`)

```html
<div class="sidebar">
  <div class="container sidebar-sticky">
    <div class="sidebar-about">
      <a href="{{ .Site.BaseURL }}"><h1>{{ .Site.Title }}</h1></a>
      <p class="lead">{{ .Site.Params.description | markdownify }}</p>
    </div>

    <ul class="sidebar-nav">
      <li><a href="/">Home</a> </li>
      {{ range .Site.Menus.main }}
        <li><a href="{{.URL}}"> {{ .Name }} </a></li>
      {{end}}
    </ul>
  </div>
</div>
```

## ContentForm
- File: CSS in `src/css/imports/menu.css`
- Description: Full-width text inputs, textarea, and coral submit button used on Contact.

```css
.content {
  input,
  textarea,
  button {
    display: block;
    outline: none;
    box-sizing: border-box;
    box-shadow: none;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    padding: 16px;
    margin-bottom: 16px;
  }

  button {
    color: white;
    background: #ff7660;
    border: none;
    cursor: pointer;
  }
}
```

## GalleryCarousel
- File: `src/js/app.js` + `site/layouts/_default/list.html`
- Description: Siema carousel of gallery images with Prev/Next buttons.
