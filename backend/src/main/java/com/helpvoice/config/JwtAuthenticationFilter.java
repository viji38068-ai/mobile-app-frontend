package  com.helpvoice.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.security.Key;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private static final javax.crypto.SecretKey JWT_SECRET = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String header = request.getHeader("Authorization");
        logger.debug("Processing {} - Token present: {}", request.getRequestURI(), header != null);
        
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                Claims claims = Jwts.parser()
                    .verifyWith(JWT_SECRET)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
                
                String phoneNumber = claims.getSubject();
                logger.debug("Valid token for user: {}", phoneNumber);
                if (phoneNumber != null) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        phoneNumber, null, Collections.emptyList());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                logger.warn("Invalid token for {}: {}", request.getRequestURI(), e.getMessage());
                // Invalid token - continue
            }
        }
        
        filterChain.doFilter(request, response);
    }
}

