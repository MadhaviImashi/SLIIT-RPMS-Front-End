import AboutItem from './AboutItem';
import './About.css';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { Col, Container, Row } from 'react-bootstrap';

const About = () => {
  return (
      <div>
        <Container className="about-container">
          <Row>
            <h1 className="about-title">About</h1>
            <p className="about-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </Row>
          <Row>
            <Col sm>
              <AboutItem
                  icon={<TrendingUpIcon fontSize="large" className="trendingUpIcon" />}
                  itemTitle="Real Time Update"
                  itemDescription="Students and academic staff members can view live changes"
              />
            </Col>
            <Col sm>
              <AboutItem
                  icon={<ManageHistoryIcon fontSize="large" className="manageHistoryIcon" />}
                  itemTitle="Simple Management"
                  itemDescription="Easy marking scheme creating, Group handling , report generating and many more options"
              />
            </Col>
            <Col sm>
              <AboutItem
                  icon={<GroupsRoundedIcon fontSize="large" className="groupsRoundedIcon" />}
                  itemTitle="Easy Collaboration with Staff"
                  itemDescription="Easy message sending features"
              />
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default About;
