<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
				  table {
				    border-collapse: collapse;
				  }
				  td, th {
				    border: 1px solid #999;
				    padding: 0.5rem;
				    text-align: left;
				  }
				  th {
				    font-weight: bold;
				  }
			  </style>
			</head>
			<body>
				<table>
					<tr>
						<th>Computer Type</th>
						<th>Title</th>
						<th>Model</th>
						<th>Motherboard</th>
						<th>CPU</th>
						<th>RAM</th>
						<th>Storage</th>
						<th>GPU</th>
						<th>PSU</th>
					</tr>
					<xsl:for-each select="computers/computer">
							<tr>
								<td>
									<xsl:value-of select="type"/>
								</td>
								<td>
									<xsl:value-of select="title"/>
								</td>
								<td>
									<xsl:value-of select="model"/>
								</td>
								<td>
									<xsl:value-of select="motherboard"/>
								</td>
								<td>
									<xsl:value-of select="cpu"/>
								</td>
								<td>
									<xsl:value-of select="ram"/>
								</td>
								<td>
									<xsl:value-of select="storage"/>
								</td>
								<td>
									<xsl:value-of select="gpu"/>
								</td>
								<td>
									<xsl:value-of select="psu"/>
								</td>								
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>