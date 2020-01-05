import React from 'react';
import '../../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="container">
      <h1>O nas</h1>
      <div className="desc_container about">
        <p>Jak to wszystko się zaczeło... Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo</p>
        <p>Nasze pasje... Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.</p>
        <p>Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui.</p>
        <img src="/img/Ariel.png" alt="ThinkTree Ariel" />
      </div>
    </div>
  );
};

export default AboutUs;
