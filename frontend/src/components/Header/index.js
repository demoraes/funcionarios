import React from 'react';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <aside>
          <Profile>
            <div>
              <h1>Admin</h1>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
