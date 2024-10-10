package com.example.mycrudapp.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.mycrudapp.service.jwt.UserDetailsImp;
import com.example.mycrudapp.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserDetailsImp employeeDetails;
    private final JwtUtil jwtUtil;

    @Autowired
    public JwtRequestFilter(UserDetailsImp employeeDetails, JwtUtil jwtUtil) {
        this.employeeDetails = employeeDetails;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        // Correctly checking the Authorization header
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Ensure the header is not null and starts with "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Extract the token by removing the "Bearer " prefix
            username = jwtUtil.extractUsername(token); // Extract username from the token
        }

        // Ensure username is not null and no existing authentication is set in the
        // SecurityContext
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = employeeDetails.loadUserByUsername(username); // Load user details

            // Validate the token
            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication in the security context
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        // Proceed with the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
