#pragma glslify: export(cartesian_to_barycentric)

vec3 cartesian_to_barycentric (vec2 p, vec2 a, vec2 b, vec2 c) {
  float l0 = ((b.y-c.y)*(p.x-c.x) + (c.x-b.x)*(p.y-c.y))
    / ((b.y-c.y)*(a.x-c.x)+(c.x-b.x)*(a.y-c.y));
  float l1 = ((c.y-a.y)*(p.x-c.x)+(a.x-c.x)*(p.y-c.y))
    / ((b.y-c.y)*(a.x-c.x)+(c.x-b.x)*(a.y-c.y));
  return vec3(l0, l1, 1.0 - l0 - l1);
}
