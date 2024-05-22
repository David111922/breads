const React = require("react");
const Default = require("./layouts/default");

function Show({ bread, index }) {
  // Confirm we are getting our bread data in the terminal.
  // console.log(bread.name)
  return (
    <Default>
      <h3>{bread.name}</h3>
      <p>
        and it
        {bread.hasGluten ? <span> does </span> : <samp> does not </samp>}
        have gluten
      </p>
      
      <img src={bread.image} alt={bread.image} />
      <p>{bread.getBakedBy()}</p>
      <li>
        {/* should this still be her ???? */}
        <a href="/breads"> Go home </a>{" "}
      </li>

      <a href={`/breads/${bread.id}/edit`}>
        <button>Edit</button>
      </a>

      <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
        <input type="submit" value="DELETE" />
      </form>
    </Default>
  );
}

module.exports = Show;
