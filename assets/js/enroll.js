const instituteSelect = document.getElementById("institute");
const courseSelect = document.getElementById("course");

const coursesByInstitute = {
    ite: [
        ["Bachelor of Elementary Education Major in General Education"],
        ["Bachelor of Early Childhood Education"],
        ["Bachelor of Secondary Education Major in Science"],
        ["Bachelor of Technology and Livelihood Education Major in ICT"]
    ],
    ics: [
        ["Bachelor of Science in Information Technology"],
        ["Bachelor of Science in Computer Engineering"]
    ],
    ibe: [
        ["Bachelor of Science in Entrepreneurship"],
        ["Bachelor of Science in Business Administration"]
    ]
};

instituteSelect.addEventListener("change", function () {
    const courses = coursesByInstitute[this.value] || [];

    courseSelect.replaceChildren();

    const placeholder = new Option(
        courses.length ? "Choose a Course" : "Choose an institute first",
        ""
    );
    courseSelect.add(placeholder);

    courses.forEach(function ([courseName]) {
        courseSelect.add(new Option(courseName, courseName));
    });

    courseSelect.disabled = courses.length === 0;
    courseSelect.value = "";
});

function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Show the alert message
    alert("ARAL NA");
    window.location.href = "landing-page.html";
}