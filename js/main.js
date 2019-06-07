var treeData = [
  {
    "name": "Srini",
    "parent": "null",
    "wiki": "Srini is a homo sapien resident of Planet earth with a propensity to make cheesy websites.",
    "male": "yes",
    "children": [
      {
        "name": "Padma",
        "wiki": "Padma won the state hurdles championships in India. She also gave birth to Srini in her spare time and somehow managed to retain her sanity.",
        "parent": "Srini",
        "children": [
          {
            "name": "Srimathi",
            "parent": "Padma",
            "wiki": "Srimathi was a professor of Mathematics in Ennore, Chennai. She was also a bomb nana.",
            "children": [
              {
                "name": "Veeraraghavachariar",
                "parent": "Srimathi",
                "male": "yes",
                "deceased": "yes",
                "wiki": "More research needed."
              },
              {
                "name": "Rajalakshmi",
                "parent": "Srimathi",
                "wiki": "More research needed."
              }
            ]
          },
          {
            "name": "Ranga",
            "parent": "Padma",
            "deceased": "yes",
            "male": "yes",
            "wiki": "Ranga was a businessman that dealt in agricultural products back in 1950s India. He owned one of the original Jawa motorcycles and was a loving granpa.",
            "children": [
              {
                "name": "Rangaswamy",
                "parent": "Ranga",
                "deceased": "yes",
                "male": "yes",
                "wiki": "More research needed."
              },
              {
                "name": "Komala",
                "deceased": "yes",
                "parent": "Ranga",
                "wiki": "More research needed."
              }
            ]
          }
        ]
      },
      {
        "name": "Muthu",
        "parent": "Srini",
        "wiki": "Muthu is a badass banker that built a reputation for remembering bank balances from memory to the third decimal point. A huge foodie, he loves cooking on the weekends.",
        "male": "yes",
        "children": [
          {
            "name": "Ramaswamy",
            "male": "yes",
            "wiki": "Ramaswamy worked for the Indian Railways for 50 full years, never having missed a day. He loves visiting temples all over India with his wife Ramamani.",
            "parent": "Muthu",
            "children": [
              {
                "name": "Aaramuda Iyengar",
                "deceased": "yes",
                "parent": "Ramaswamy",
                "male": "yes",
                "wiki": "Further Research needed."
              },
              {
                "name": "Unknown",
                "deceased": "yes",
                "parent": "Ramaswamy",
                "wiki": "Further research needed."
              }
            ]
          },
          {
            "name": "Ramamani",
            "parent": "Muthu",
            "wiki": "The matriarch of the family, she raised two sons and two daughters. She is a phenomenal chef and loves baking Badushahs."
          }
        ]
      }
    ]
  }
];


// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "500px");

function gender_color_fill(d) {
    if (d._children) {
            return d.male ? "lightsteelblue" : "pink";
        }
        else {
            return "#fff";
        }
}

function gender_color_stroke(d) {
    return d.male ? "#036" : "mediumvioletred";
}

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", gender_color_fill)
      .style("stroke", gender_color_stroke);;

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 10)
      .style("fill", gender_color_fill)
      .style("stroke", gender_color_stroke);

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }

  wiki.innerHTML = '<img src="images/' + d.name + '.jpg"><p>' + d.wiki + '</p>'

  update(d);
}

function expand(d){
    var children = (d.children) ? d.children : d._children;
    if (d._children) {
        d.children = d._children;
        d._children = null;
    }
    if(children)
      children.forEach(expand);
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function expandAll(){
    expand(root);
    update(root);
}

function collapseAll(){
    root.children.forEach(collapse);
    collapse(root);
    update(root);
}