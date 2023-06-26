# Data Fetching Principles in NextJs

> Server Side Rendering (SSR)
>
> Static Site Generation
>
> Incremental Static Generation

# How To Define Metadata in NextJs

## We can define it in 2 ways:

> Static Metadata
> Dynamic Metadata

## Static Metadata

```js
// page.js
export const metadata = {
  title: 'Home',
};

// Output:
// <head>
//   <title>Home</title>
// </head>

export default function page() {
  return <h1>Hi there! I'm Outputting Static Metadata</h1>;
}
```

## Dynamic Metadata

```js
// page.js
export async function generateMetadata({params, searchParams}){
  const post await getPost(params.id)
  return {
    title:post.title
  }
}

// Output:
// <head>
//   <title>Telephone</title>
// </head>

export default function page() {
  return <h1>Hi there! I'm Outputting Dynamic Metadata</h1>;
}

```
