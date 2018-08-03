<script>
	var groups = [
		/* projects */
		[
			{% for project in site.data.egjs.projects %}
			{
				name: "{{project.name}}",
				url: "{{project.url}}",
				target: "{{project.target}}",
			},
			{% endfor %}
		0],
		/* layouts */
		[
			{% for layout in site.data.egjs.layouts %}
			/* {{layout.name}} */
			{% for demo in layout.demos %}
			{
				name: "{{demo.name}}",
				url: "./assets/html/{{demo.target}}.html",
				target: "{{demo.target}}",
			},
			{% endfor %}
			{% endfor %}
		0],
		/* reacts */
		[
			{% for demo in site.data.egjs.reacts %}
			{
				name: "{{demo.name}}",
				url: "{{demo.url}}",
				target: "{{demo.target}}",
			},
			{% endfor %}
		0],
	];
</script>
{% include_relative assets/html/demo.html %}