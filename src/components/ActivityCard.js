import { ReactComponent as Run } from '../img/activity_icons/directions_run.svg';
import { ReactComponent as Camping } from '../img/activity_icons/camping.svg';
import { ReactComponent as Skiing } from '../img/activity_icons/downhill_skiing.svg';
import { ReactComponent as Fishing } from '../img/activity_icons/fishing.svg';
import { ReactComponent as Hiking } from '../img/activity_icons/hiking.svg';
import { ReactComponent as Surfing } from '../img/activity_icons/surfing.svg';
import { ReactComponent as Telescope } from '../img/activity_icons/telescope.svg';

function ActivityCard({ activity="Running", ideal="Ideal" }) {

    let className = "rating rating-" + ideal.toLowerCase();
    let cardType = ideal == "Unavailable" ? "card unavailable" : "card";
  
    let icon = null;
    if (activity == "Running") { icon = <Run />; } else
      if (activity == "Camping") { icon = <Camping />; } else
        if (activity == "Skiing") { icon = <Skiing />; } else
          if (activity == "Fishing") { icon = <Fishing />; } else
            if (activity == "Hiking") { icon = <Hiking />; } else
              if (activity == "Watersport") { icon = <Surfing />; } else
                if (activity == "Stargazing") { icon = <Telescope />; }
  
    return (
      <div class={cardType}>
        <div class="card-content">
          {icon}
          <h3>{activity}</h3>
          <div class={className}>
            <hr class="bar"></hr>
            <p>{ideal}</p>
          </div>
        </div>
      </div>
    );
  }
  export {ActivityCard};