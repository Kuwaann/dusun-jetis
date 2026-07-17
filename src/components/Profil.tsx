export default function Profil() {
  return (
    <section className="section welcome reveal" id="profil">
      <div className="welcome-media">
        <div className="image-placeholder">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          [Placeholder Foto Kepala Wilayah]
        </div>
      </div>

      <div className="welcome-copy">
        <h2 className="welcome-title">
          Sambutan dari Kepala Wilayah,<br />
          Ibu Lorem Ipsum
        </h2>
        <p className="welcome-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam
          in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consec,
          ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
          Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
          nibh nibh, at molestie ante fermentum at amet. Pellentesque commodo lacus et ultrices
          nortor. Quisque sagittis est at diam condimentum, vel euismod erat placerat. In
          iaculis arcu eros, eget tempor orci facilisis id.
        </p>
      </div>
    </section>
  );
}
